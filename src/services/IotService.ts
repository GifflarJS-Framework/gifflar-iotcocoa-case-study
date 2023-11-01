import { networks, defaultNetwork } from "../../gifflarconfig.json";
import { createGifflarManager } from "@gifflar/solgen";
import { IContractDeployDTO } from "@gifflar/solgen/bin/modules/managing/gifflarContract/types/IContractDeployDTO";
import { IGifflarManager } from "@gifflar/solgen/bin/modules/managing/gifflarManager/types/IGifflarManager";
import { IGifflarContract } from "@gifflar/solgen/bin/modules/managing/gifflarContract/types/IGifflarContract";
import { INetworkConfig } from "@gifflar/solgen/bin/modules/deployer/types/INetworkConfig";
import { Contract } from "web3-eth-contract";
import { IIoTValue } from "../types/IIoTValue";
import { IIoTSensorData } from "../types/IIoTSensorData";

class IotService {
  // Creating contract manager
  private myGifflarManager: IGifflarManager = createGifflarManager();
  private definitions: Array<any> = [];
  private deviceMeasures: Array<IIoTValue> = [];

  constructor(accountPrivateKey?: string) {
    const network: INetworkConfig = networks.filter((network) => {
      return network.key === defaultNetwork;
    })[0];
    this.myGifflarManager.setDeployConfig(network);
    if (accountPrivateKey) this.myGifflarManager.addSigner(accountPrivateKey);
  }

  createModel(sensors: Array<IIoTSensorData>): void {
    let gContract: IGifflarContract;
    let gContractController: IGifflarContract;

    sensors.map((sensor) => {
      this.deviceMeasures = [];

      // Creating the Sensor Contract
      gContract = this.myGifflarManager.newContract(sensor.data.name);
      this._setupVariables(gContract, sensor.data.values);
      this._setupEvents(gContract);
      this._setupConstructor(gContract);
      this._setupFunctions(gContract, sensor.data.values);
      this._setupGetValues(gContract, sensor.data.values);
      this._setupSetMeasures(gContract);

      // Creating the Controller Sensor Contract
      gContractController = this.myGifflarManager.newContract(
        sensor.data.name + "Controller"
      );
      this._setupController(gContractController, sensor.data.name);
    });
  }

  write(): string {
    return this.myGifflarManager.writeAll();
  }

  writeByName(contractName: string): string {
    const code = this.myGifflarManager.getContract(contractName).write();
    const codeController = this.myGifflarManager
      .getContract(`${contractName}Controller`)
      .write();

    return code + codeController;
  }

  compile(contractName: string, callback: (errors: any) => void): any {
    return this.myGifflarManager.compile(contractName, callback);
  }

  deploy(contractName: string, inputs: IContractDeployDTO): Promise<Contract> {
    return this.myGifflarManager.deploy(contractName, inputs);
  }

  _capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _setupVariables(contract: IGifflarContract, variables: Array<IIoTValue>) {
    // Setting default variables
    contract.createVariable({ regularType: "address" }, "manager", "public");

    // Setting json variables
    variables.map((v: IIoTValue) => {
      // Saving the sensor measures to be organized lately
      if (v.max || v.min) {
        this.deviceMeasures.push(v);
        contract.createVariable({ regularType: v.type }, v.idv, "public");
      } else {
        contract.createVariable({ regularType: v.type }, v.idv, "public");
      }

      // Setting up the definitions to be made lately
      v.default
        ? this.definitions.push({
            variable: v.idv,
            value: v.default,
          })
        : null;

      //Setting max and min variables
      if (v.max) {
        const maxname = "max" + this._capitalize(v.idv);
        contract.createVariable({ regularType: v.type }, maxname, "public");

        this.definitions.push({
          variable: maxname,
          value: v.max,
        });
      }
      if (v.min) {
        const minname = "min" + this._capitalize(v.idv);
        contract.createVariable({ regularType: v.type }, minname, "public");

        this.definitions.push({
          variable: minname,
          value: v.min,
        });
      }
    });
  }

  _setupEvents(contract: IGifflarContract) {
    this.deviceMeasures.map((v) => {
      if (v.max) {
        contract.createEvent(`${v.idv}Overflow`, [
          { name: `${v.idv}`, type: { regularType: v.type } },
        ]);
      }
      if (v.min) {
        contract.createEvent(`${v.idv}Underflow`, [
          { name: `${v.idv}`, type: { regularType: v.type } },
        ]);
      }
    });
  }

  _setupConstructor(contract: IGifflarContract) {
    // Starting the constructor
    const constructor = contract
      .createConstructor()
      .setInput({ regularType: "address" }, "_owner")
      .setAssignment("manager", { customExpression: "_owner" });

    // Setting up all definitions
    this.definitions.map((def) => {
      constructor.setAssignment(def.variable, { customExpression: def.value });
    });

    // Reseting the definitions (needed for when creating controller contract)
    this.definitions = [];
  }

  _setupFunctions(contract: IGifflarContract, variables: Array<IIoTValue>) {
    // Setting json variables
    variables.map((v) => {
      // Saving the sensor measures to be organized lately
      if (!v.max && !v.min) {
        contract
          .createFunction("set" + this._capitalize(v.idv), "public")
          .setInput({ regularType: v.type }, "_" + v.idv)
          .setAssignment(v.idv, { customExpression: `_${v.idv}` });
      }

      //Setting max and min variables
      if (v.max) {
        const maxname = "max" + this._capitalize(v.idv);
        // Set function
        contract
          .createFunction(`set${this._capitalize(maxname)}`, "public")
          .setInput({ regularType: v.type }, "_" + maxname)
          .setAssignment(maxname, { customExpression: `_${maxname}` });
      }
      if (v.min) {
        const minname = "min" + this._capitalize(v.idv);
        // Set function
        contract
          .createFunction("set" + this._capitalize(minname), "public")
          .setInput({ regularType: v.type }, "_" + minname)
          .setAssignment(minname, { customExpression: `_${minname}` });
      }
    });
  }

  _setupGetValues(contract: IGifflarContract, variables: Array<IIoTValue>) {
    const getValues = contract.createFunction(
      "getValues",
      "public",
      [],
      [],
      {stateMutability: "view"}
    );

    const returnValues: string[] = [];
    variables.map((v) => {
      getValues.setOutput({ regularType: v.type });
      returnValues.push(v.idv);
    });
    getValues.setReturn(returnValues);
  }

  _setupSetMeasures(contract: IGifflarContract) {
    this.deviceMeasures.map((v) => {
      const setMeasure = contract
        .createFunction("set" + this._capitalize(v.idv), "public")
        .setInput({ regularType: v.type }, "_" + v.idv)
        .setAssignment(v.idv, { customExpression: `_${v.idv}` });
      if (v.max) {
        setMeasure
          .beginIf(v.idv + " <= max" + this._capitalize(v.idv))
          .setEventCall(v.idv + "Overflow", [v.idv])
          .endIf();
      }
      if (v.min) {
        setMeasure
          .beginIf(v.idv + " >= min" + this._capitalize(v.idv))
          .setEventCall(v.idv + "Underflow", [v.idv])
          .endIf();
      }
    });
  }

  _setupController(contract: IGifflarContract, controlledName: string) {
    contract.createVariable(
      { customType: `${controlledName}[]` },
      "contracts",
      "public"
    );
    contract.createVariable({ regularType: "uint" }, "counter", "private", {
      expressionValue: {customExpression: "0"},
    });

    contract
      .createFunction("createContract", "public")
      .setInput({ regularType: "address" }, "_owner")
      .setVariable({ customType: controlledName }, "newContract", {
        expressionValue: {customExpression: `new ${controlledName}(_owner)`},
      })
      .setMethodCall("contracts", "push", ["newContract"])
      .setAssignment("counter", { customExpression: "counter + 1" });

    contract
      .createFunction(
        "getLastContract",
        "public",
        [],
        [{ type: { customType: controlledName } }],
        {stateMutability: "view"}
      )
      .setVariable({ customType: controlledName }, "lastContract")
      .beginIf("counter > 0")
      .setAssignment("lastContract", {
        customExpression: "contracts[counter - 1]",
      })
      .endIf()
      .beginElse()
      .setAssignment("lastContract", { customExpression: "contracts[0]" })
      .endElse();
  }
}

export default IotService;
