export enum RelationshipDegreeEnum {
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  SIBLING = 'SIBLING',
  SPOUSE = 'SPOUSE',
  GRANDPARENT = 'GRANDPARENT',
  GRANDCHILD = 'GRANDCHILD',
  AUNT_UNCLE = 'AUNT_UNCLE',
  NIECE_NEPHEW = 'NIECE_NEPHEW',
  COUSIN = 'COUSIN',
}

export type Patient = {
  id?: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  fee: number
  isSpecialPatient: boolean
  hasAResponsible: boolean
  responsibleName?: string | null
  responsibleEmail?: string | null
  responsiblePhoneNumber?: string | null
  relationshipDegree?: RelationshipDegreeEnum | null
}
