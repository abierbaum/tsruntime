import 'reflect-metadata';

export module Types {

  export enum TypeKind {
    Any = 1,
    String,
    Number,
    Boolean,
    Enum,
    StringLiteral,
    NumberLiteral,
    BooleanLiteral,
    EnumLiteral,
    ESSymbol,
    Void,
    Undefined,
    Null,
    Never,
    
    Object,
    
    Tuple,
    Union,
    Reference,
    Class
  }




  export type Type = TupleType | AnyType | VoidType | NeverType | ESSymbolType |  EnumType  | ObjectType | ClassType | StringType | NumberType | BooleanType | ReferenceType | UnionType | NullType | UndefinedType

  export interface BaseType {
    kind: TypeKind
    initializer?: any //todo
    optional?: boolean
  }

  export interface StringType extends BaseType {
    kind: TypeKind.String
  }

  export interface NumberType extends BaseType {
    kind: TypeKind.Number
  }
  export interface TupleType extends BaseType {
    kind: TypeKind.Tuple
    elementTypes: Type[]
  }
  export interface BooleanType extends BaseType {
    kind: TypeKind.Boolean
  }

  export interface NullType extends BaseType {
    kind: TypeKind.Null
  }

  export interface UndefinedType extends BaseType {
    kind: TypeKind.Undefined
  }

  export interface EnumType extends BaseType {
    kind: TypeKind.Enum
  }
  export interface ESSymbolType extends BaseType {
    kind: TypeKind.ESSymbol
  }
  export interface VoidType extends BaseType {
    kind: TypeKind.Void
  }
  export interface NeverType extends BaseType {
    kind: TypeKind.Never
  }
  export interface AnyType extends BaseType {
    kind: TypeKind.Any
  }


  export interface ObjectType extends BaseType {
    kind: TypeKind.Object
  }

  export interface UnionType extends BaseType {
    kind: TypeKind.Union
    types: Type[]
  }
  export interface ReferenceType extends BaseType {
    kind: TypeKind.Reference
    type: any
    arguments: Type[]
  }

  export interface ClassType extends BaseType {
    kind: TypeKind.Class
    props: string[]
    extends?: Types.Type
  }

}

export function Reflective(target: any) {

}


export const MetadataKey = "tsruntime:type"


export function getType(target: Function): Types.Type | undefined {
  return Reflect.getMetadata(MetadataKey, target)
}

export function mustGetType(target: Function): Types.Type {
  const type = getType(target)
  if (type === undefined) {
    throw new Error("can't find type")
  }
  return type
}



export function mustGetPropType(target: Function, propertyKey: string | symbol): Types.Type {
  const type = getPropType(target, propertyKey)
  if (type === undefined) {
    throw new Error("can't find prop type")
  }
  return type
}



export function getPropType(target: Function, propertyKey: string | symbol) {
  return Reflect.getMetadata(MetadataKey, target.prototype, propertyKey)
}