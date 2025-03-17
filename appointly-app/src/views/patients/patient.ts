export type RelationshipDegree =
  | 'PARENT'
  | 'CHILD'
  | 'SIBLING'
  | 'SPOUSE'
  | 'GRANDPARENT'
  | 'GRANDCHILD'
  | 'AUNT_UNCLE'
  | 'NIECE_NEPHEW'
  | 'COUSIN'


export type Patient = {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  fee: number
  isSpecialPatient: boolean
  hasAResponsible: boolean
  responsibleName: string | null
  responsibleEmail: string | null
  responsiblePhoneNumber: string | null
  relationshipDegree: RelationshipDegree | null
}
