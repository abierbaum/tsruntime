
import {Reflective, getType, getPropType, Types} from '../src/types'

class GenericCls<T> {

}

class Cls {

}

enum Enum {
    a = 1,
    b
}

@Reflective
class AllTypes {
    string: string
    number: number
    any: any
    undefined: undefined
    null: null
    void: void
    never: never
    symbol: symbol
    array: string[]
    // object: {}
    union: string | number
    tuple: [string, number]

    enum: Enum

    refArray: Array<string>
    refString: String
    refNumber: Number
    refDate: Date

    ref: Cls
    genRef: GenericCls<string>

    optional?: String
}

@Reflective
class DerrivedTypes {
    string = "string"
    number = 42
    array = []
    boolean = false
    boolean2 = true
    null = null
    undefined = undefined

    refArray = Array<string>()
    ref = new Cls()
    genRef = new GenericCls<string>()
}



// a.a = null








describe('All types', () => {
   it('string', () => {
      const clsType = getPropType(AllTypes, "string") as Types.StringType;
      expect(clsType.kind).toBe(Types.TypeKind.String)
   });
   it('number', () => {
      const clsType = getPropType(AllTypes, "number") as Types.NumberType;
      expect(clsType.kind).toBe(Types.TypeKind.Number)
   });
   it('any', () => {
      const clsType = getPropType(AllTypes, "any") as Types.AnyType;
      expect(clsType.kind).toBe(Types.TypeKind.Any)
   });
   it('undefined', () => {
      const clsType = getPropType(AllTypes, "undefined") as Types.UndefinedType;
      expect(clsType.kind).toBe(Types.TypeKind.Undefined)
   });
    it('null', () => {
      const clsType = getPropType(AllTypes, "null") as Types.NullType;
      expect(clsType.kind).toBe(Types.TypeKind.Null)
   });
   it('void', () => {
      const clsType = getPropType(AllTypes, "void") as Types.VoidType;
      expect(clsType.kind).toBe(Types.TypeKind.Void)
   });
   it('never', () => {
      const clsType = getPropType(AllTypes, "never") as Types.NeverType;
      expect(clsType.kind).toBe(Types.TypeKind.Never)
   });
   it('symbol', () => {
      const clsType = getPropType(AllTypes, "symbol") as Types.ESSymbolType;
      expect(clsType.kind).toBe(Types.TypeKind.ESSymbol)
   });
});

