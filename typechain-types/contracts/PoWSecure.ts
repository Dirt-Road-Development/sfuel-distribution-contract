/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface PoWSecureInterface extends utils.Interface {
  functions: {
    "deprecate()": FunctionFragment;
    "getAmount()": FunctionFragment;
    "getBalance()": FunctionFragment;
    "getState()": FunctionFragment;
    "owner()": FunctionFragment;
    "pay(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "toggleState()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateAmount(uint256)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deprecate"
      | "getAmount"
      | "getBalance"
      | "getState"
      | "owner"
      | "pay"
      | "renounceOwnership"
      | "toggleState"
      | "transferOwnership"
      | "updateAmount"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "deprecate", values?: undefined): string;
  encodeFunctionData(functionFragment: "getAmount", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getState", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pay",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "toggleState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAmount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "deprecate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toggleState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "AmountUpdated(uint256,uint256,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Payed(address,uint256,uint256)": EventFragment;
    "StateToggled(address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AmountUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Payed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StateToggled"): EventFragment;
}

export interface AmountUpdatedEventObject {
  originalAmount: BigNumber;
  newAmount: BigNumber;
  signer: string;
}
export type AmountUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  AmountUpdatedEventObject
>;

export type AmountUpdatedEventFilter = TypedEventFilter<AmountUpdatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PayedEventObject {
  payee: string;
  amount: BigNumber;
  timestamp: BigNumber;
}
export type PayedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  PayedEventObject
>;

export type PayedEventFilter = TypedEventFilter<PayedEvent>;

export interface StateToggledEventObject {
  signer: string;
  newState: boolean;
}
export type StateToggledEvent = TypedEvent<
  [string, boolean],
  StateToggledEventObject
>;

export type StateToggledEventFilter = TypedEventFilter<StateToggledEvent>;

export interface PoWSecure extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PoWSecureInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deprecate(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    getState(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pay(
      receiver: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    toggleState(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateAmount(
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deprecate(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAmount(overrides?: CallOverrides): Promise<BigNumber>;

  getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getState(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  pay(
    receiver: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  toggleState(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateAmount(
    _newAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deprecate(overrides?: CallOverrides): Promise<void>;

    getAmount(overrides?: CallOverrides): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getState(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    pay(
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    toggleState(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateAmount(
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AmountUpdated(uint256,uint256,address)"(
      originalAmount?: PromiseOrValue<BigNumberish> | null,
      newAmount?: PromiseOrValue<BigNumberish> | null,
      signer?: PromiseOrValue<string> | null
    ): AmountUpdatedEventFilter;
    AmountUpdated(
      originalAmount?: PromiseOrValue<BigNumberish> | null,
      newAmount?: PromiseOrValue<BigNumberish> | null,
      signer?: PromiseOrValue<string> | null
    ): AmountUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Payed(address,uint256,uint256)"(
      payee?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null,
      timestamp?: PromiseOrValue<BigNumberish> | null
    ): PayedEventFilter;
    Payed(
      payee?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null,
      timestamp?: PromiseOrValue<BigNumberish> | null
    ): PayedEventFilter;

    "StateToggled(address,bool)"(
      signer?: PromiseOrValue<string> | null,
      newState?: PromiseOrValue<boolean> | null
    ): StateToggledEventFilter;
    StateToggled(
      signer?: PromiseOrValue<string> | null,
      newState?: PromiseOrValue<boolean> | null
    ): StateToggledEventFilter;
  };

  estimateGas: {
    deprecate(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAmount(overrides?: CallOverrides): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getState(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pay(
      receiver: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    toggleState(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateAmount(
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deprecate(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pay(
      receiver: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    toggleState(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateAmount(
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
