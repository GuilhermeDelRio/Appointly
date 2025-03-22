import { useTranslation } from 'react-i18next'
import { patientService } from '@/services/patientService'
import { usePatientStore } from '@/stores/patientStore'
import { toast } from 'sonner'
import { User } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from 'react-hook-form'
import { z } from "zod"

import { Patient, RelationshipDegreeEnum } from './patient'
import { DialogProps } from '@/types/dialogProps'

import { PhoneInput } from '@/components/phoneInput/PhoneInput'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useDialogStore } from '@/stores/dialogStore'
import { useEffect, useState } from 'react'

const isNotFutureDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  return date <= now
}

const createPatientFormSchema = (t: (key: string, options?: any) => string): z.ZodType<Patient> =>
  z.object({
    id: z.string().optional(),

    firstName: z
      .string()
      .min(2, { message: t('patients:validation:minValidation', { field: t('patients:fields:firstName'), value: 2 }) })
      .max(25, { message: t('patients:validation:maxValidation', { field: t('patients:fields:firstName'), value: 25 }) })
      .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:firstName') }) }),

    lastName: z
      .string()
      .min(2, { message: t('patients:validation:minValidation', { field: t('patients:fields:lastName'), value: 2 }) })
      .max(50, { message: t('patients:validation:maxValidation', { field: t('patients:fields:lastName'), value: 50 }) })
      .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:lastName') }) }),

    dateOfBirth: z
      .string()
      .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:dateOfBirth') }) })
      .refine(isNotFutureDate, {
        message: t('patients:validation:noFutureDate', { field: t('patients:fields:dateOfBirth') }),
      }),

    phoneNumber: z
      .string()
      .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:phoneNumber') }) }),

    email: z
      .string()
      .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:email') }) })
      .email({ message: t('patients:validation:email') }),

    fee: z
      .number({ required_error: t('patients:validation:requiredValidation', { field: t('patients:fields:fee') }) })
      .min(0, { message: t('patients:validation:minValue', { field: t('patients:fields:fee'), value: 0 }) }),

    isSpecialPatient: z.boolean({ required_error: t('patients:validation:requiredValidation', { field: t('patients:fields:isSpecialPatient') }) }),

    hasAResponsible: z.boolean({ required_error: t('patients:validation:requiredValidation', { field: t('patients:fields:hasAResponsible') }) }),

    responsibleName: z
      .string()
      .min(2, { message: t('patients:validation:minValidation', { field: t('patients:fields:responsibleName'), value: 2 }) })
      .max(25, { message: t('patients:validation:maxValidation', { field: t('patients:fields:responsibleName'), value: 25 }) })
      .nullable()
      .optional(),

    responsibleEmail: z
      .string()
      .email({ message: t('patients:validation:email') })
      .nullable()
      .optional(),

    responsiblePhoneNumber: z.string().nullable().optional(),

    relationshipDegree: z.nativeEnum(RelationshipDegreeEnum).nullable(),
  })

  const defaultValues = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',

    fee: 0,
    isSpecialPatient: false,
    hasAResponsible: false,

    responsibleName: null,
    responsibleEmail: null,
    responsiblePhoneNumber: null,

    relationshipDegree: null,
  }

export function PatientsDialog({ open, onOpenChange }: DialogProps) {

  const [isEdit, setIsEdit] = useState(false)

  const { t } = useTranslation()
  const patientFormSchema = createPatientFormSchema(t)

  const { dialogData } = useDialogStore()

  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues
  })
  
  const hasResponsible = useWatch({
    control: form.control,
    name: 'hasAResponsible',
    defaultValue: false
  })

  const relationshipDegreeLabels = {
    [RelationshipDegreeEnum.PARENT]: t('patients:fields:relationshipDegreeLabel:parent'),
    [RelationshipDegreeEnum.CHILD]: t('patients:fields:relationshipDegreeLabel:child'),
    [RelationshipDegreeEnum.SIBLING]: t('patients:fields:relationshipDegreeLabel:sibling'),
    [RelationshipDegreeEnum.SPOUSE]: t('patients:fields:relationshipDegreeLabel:spouse'),
    [RelationshipDegreeEnum.GRANDPARENT]: t('patients:fields:relationshipDegreeLabel:grandparent'),
    [RelationshipDegreeEnum.GRANDCHILD]: t('patients:fields:relationshipDegreeLabel:grandchild'),
    [RelationshipDegreeEnum.AUNT_UNCLE]: t('patients:fields:relationshipDegreeLabel:aunt_uncle'),
    [RelationshipDegreeEnum.NIECE_NEPHEW]: t('patients:fields:relationshipDegreeLabel:niece_nephew'),
    [RelationshipDegreeEnum.COUSIN]: t('patients:fields:relationshipDegreeLabel:cousin'),
  }

  const getDialogTitle = () => {
    return !isEdit 
      ? `${t('common:new')} ${t('patients:singularName').toLocaleLowerCase()}` 
      : `${t('common:edit')} ${t('patients:singularName').toLocaleLowerCase()}`
  }

  const onSubmit = async (values: z.infer<typeof patientFormSchema>) => {
    try {
      values.dateOfBirth = new Date(values.dateOfBirth).toISOString()
  
      if (!isEdit) {
        await createPatient(values)
        toast.success(t('common:created', { field: t('patients:singularName') }))
      } else {
        await editPatient(values)
        toast.success(t('common:edited', { field: t('patients:singularName') }))
      }
  
      form.reset()
    } catch (ex: any) {
      toast.error(ex.message)
    }
  }

  const createPatient = async (values: z.infer<typeof patientFormSchema>) => {
    const { data: currentData, totalCount, setData } = usePatientStore.getState()
  
    const response = await patientService.create(values)
    const newData = [response.data, ...currentData]
  
    setData(newData, (totalCount ?? 0) + 1)
  }

  const editPatient = async (values: z.infer<typeof patientFormSchema>) => {
    const { data: currentData, totalCount, setData } = usePatientStore.getState()
  
    await patientService.update(values.id!, values)
  
    const newData = currentData.map((patient) =>
      patient.id === values.id ? values : patient
    )
  
    setData(newData, totalCount ?? 0)
    onOpenChange(false)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    form.reset()
    onOpenChange(false)
  }

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset()
    }
    onOpenChange(isOpen)
  }

  useEffect(() => {
    if (open) {
      setIsEdit(!!dialogData)
  
      form.reset({
        ...defaultValues,
        ...(dialogData ?? {}) 
      })
    }
  }, [open, dialogData])

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User />
            <span className="ml-1">{getDialogTitle()}</span>
          </DialogTitle>
        </DialogHeader>
  
        <Separator />

        <ScrollArea className="h-[650px] w-[100%] rounded-md border p-4">
          <div className="grid gap-4 py-4 p-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patients:fields:firstName')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patients:fields:lastName')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patients:fields:dateOfBirth')}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patients:fields:email')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patients:fields:phoneNumber')}</FormLabel>
                      <FormControl>
                        <PhoneInput defaultCountry="BR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patients:fields:fee')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          prefix="R$" 
                          min="0" 
                          {...field} 
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(value === '' ? value : Number(value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex'>
                  <FormField
                    control={form.control}
                    name="isSpecialPatient"
                    render={({ field }) => (
                      <FormItem className="flex items-center mr-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(!!checked)}
                          />
                        </FormControl>
                        <FormLabel>{t('patients:fields:isSpecialPatient')}</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasAResponsible"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(!!checked)}
                          />
                        </FormControl>
                        <FormLabel>{t('patients:fields:hasAResponsible')}</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                { hasResponsible && (
                  <>
                    <FormField
                      control={form.control}
                      name="responsibleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('patients:fields:responsibleName')}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responsibleEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('patients:fields:responsibleEmail')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" {...field} value={field.value ?? ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responsiblePhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('patients:fields:responsiblePhoneNumber')}</FormLabel>
                          <FormControl>
                            <PhoneInput defaultCountry="BR" {...field} value={field.value ?? undefined}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="relationshipDegree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('patients:fields:relationshipDegree')}</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue 
                                  placeholder={`${t('common:selectLabel')} ${t('patients:fields:relationshipDegree')}`} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(RelationshipDegreeEnum).map((degree) => (
                                <SelectItem key={degree} value={degree}>
                                  {relationshipDegreeLabels[degree]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
    
                <DialogFooter>
                  <Button variant="secondary" className="cursor-pointer" onClick={(e) => handleClose(e)}>
                    {t('common:cancel')}
                  </Button>

                  <Button type="submit" className="cursor-pointer">
                    {t('common:save')}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>

      </DialogContent>
    </Dialog>
  )
}
