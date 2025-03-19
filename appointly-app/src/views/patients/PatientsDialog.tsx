import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { User } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Patient, RelationshipDegreeEnum } from './patient'
import { DialogProps } from '@/types/dialogProps'

import {
  Form,
  FormControl,
  FormDescription,
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

import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

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
      .email({ message: t('patients:validation:email', { field: t('patients:fields:email') }) }),

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
      .email({ message: t('validation:email', { field: t('patients:fields:responsibleEmail') }) })
      .nullable()
      .optional(),

    responsiblePhoneNumber: z.string().nullable().optional(),

    relationshipDegree: z.nativeEnum(RelationshipDegreeEnum).nullable(),
  })


export function PatientsDialog({ open, onOpenChange }: DialogProps) {
  const { t } = useTranslation()
  const patientFormSchema = createPatientFormSchema(t)

  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {  
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
    },
  })
  

  function onSubmit(values: z.infer<typeof patientFormSchema>) {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User />
            <span className="ml-1">{t("patients:btnAdd")}</span>
          </DialogTitle>
        </DialogHeader>
  
        <Separator />
  
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name */}
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
  
              {/* Last Name */}
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
  
              {/* Date of Birth */}
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
  
              {/* Email */}
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
  
              {/* Fee */}
              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('patients:fields:fee')}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="R$ 100,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Responsible Name */}
              <FormField
                control={form.control}
                name="responsibleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('patients:fields:responsibleName')}</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Relationship Degree */}
              <FormField
                control={form.control}
                name="relationshipDegree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('patients:fields:relationshipDegree')}</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Is Special Patient */}
              <FormField
                control={form.control}
                name="isSpecialPatient"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
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
  
              {/* Is Active */}
              {/* <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <FormLabel>{t('patients:isActive')}</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
  
              {/* Submit Button */}
              <DialogFooter>
                <Button variant="secondary" type="submit" className="cursor-pointer">
                  {t('common:cancel')}
                </Button>

                <Button type="submit" className="cursor-pointer">
                  {t('common:save')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
