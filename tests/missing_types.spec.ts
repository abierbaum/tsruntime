/**
 * File with tests showing current limitations.
 *
 * note: tests may be need to be disabled until they work correctly.
 */
import {
   Reflective,
   mustGetType,
   mustGetPropType,
   getType,
   getPropType,
   Types
} from '../src/types'

class OuterClass {

}

@Reflective
class TestClass {
   type_prop: typeof OuterClass = OuterClass;
}


@Reflective
class ParentClass {
   children: (OuterClass|TestClass)[] = [];
}

describe('Missing Support', () => {
   it('should support "type of" types', () => {
      // should allow supporting type of types
      const type_prop_type = getPropType(TestClass, "type_prop") as Types.UnknownType;
      expect(type_prop_type.kind).toBe(Types.TypeKind.Unknown);
   });

   it('should support class union arrays', () => {
      // Should allow reflection of the types that make up the array
      const children_type = getPropType(ParentClass, "children") as Types.ReferenceType;
      expect(children_type.kind).toBe(Types.TypeKind.Reference);
      expect(children_type.type).toEqual(Array);
      expect(children_type.arguments[0].kind).toBe(Types.TypeKind.Unknown);
   });

});
