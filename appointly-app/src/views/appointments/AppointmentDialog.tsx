import { useTranslation } from 'react-i18next'
// import { patientService } from '@/services/patientService'
// import { usePatientStore } from '@/stores/patientStore'
import { toast } from 'sonner'
import { User, CalendarIcon, CalendarDays } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { ptBR } from 'date-fns/locale'
import { z } from "zod"
import { format } from "date-fns"
// import { Patient, RelationshipDegreeEnum } from '@/models/patient'
import { AppointmentRequest, AppointmentStatusEnum, AppointmentLocationEnum } from '@/models/appointment'
import { DialogProps } from '@/types/dialogProps'
import { Calendar } from "@/components/ui/calendar"
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useDialogStore } from '@/stores/dialogStore'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { TimePicker } from '@/components/DateTimePicker/time-picker'

const isNotFutureDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  return date <= now
}

const defaultValues = {
  id: '',
  appointmentDate: new Date(),
  initialDate: '',
  endDate: '',
  appointmentStatus: AppointmentStatusEnum.SCHEDULED,
  appointmentLocation: AppointmentLocationEnum.ONLINE,
  patientId: ''
}

const AppointmentFormSchema = (t: (key: string, options?: any) => string): z.ZodType<AppointmentRequest> =>
  z.object({
    id: z.string().optional(),
    appointmentDate: z.date(),
    initialDate: z
    .string()
    .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:dateOfBirth') }) })
    .refine(isNotFutureDate, {
      message: t('patients:validation:noFutureDate', { field: t('patients:fields:dateOfBirth') }),
    }),

    endDate: z
    .string()
    .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:dateOfBirth') }) })
    .refine(isNotFutureDate, {
      message: t('patients:validation:noFutureDate', { field: t('patients:fields:dateOfBirth') }),
    }),
    appointmentStatus: z.nativeEnum(AppointmentStatusEnum),
    appointmentLocation: z.nativeEnum(AppointmentLocationEnum),
    patientId: z
    .string()
    .nonempty({ message: t('patients:validation:requiredValidation', { field: t('patients:fields:dateOfBirth') }) }),
  })



export function AppointmentDialog({ open, onOpenChange }: DialogProps) {

  const [isEdit, setIsEdit] = useState(false)

  const { t } = useTranslation()
  const appointmentFormSchema = AppointmentFormSchema(t)

  const { dialogData } = useDialogStore()

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues
  })

  const appointmentStatusEnumLabels = {
    [AppointmentStatusEnum.CANCELED]: t('appointments:appointmentStatus:canceled'),
    [AppointmentStatusEnum.COMPLETED]: t('appointments:appointmentStatus:completed'),
    [AppointmentStatusEnum.CONFIRMED]: t('appointments:appointmentStatus:confirmed'),
    [AppointmentStatusEnum.NO_SHOW]: t('appointments:appointmentStatus:noShow'),
    [AppointmentStatusEnum.PENDING]: t('appointments:appointmentStatus:pending'),
    [AppointmentStatusEnum.RESCHEDULED]: t('appointments:appointmentStatus:rescheduled'),
    [AppointmentStatusEnum.SCHEDULED]: t('appointments:appointmentStatus:scheduled')
  }

  const appointmentLocationEnumLabels = {
    [AppointmentLocationEnum.ONLINE]: t('appointments:appointmentLocation:online'),
    [AppointmentLocationEnum.OFFICE]: t('appointments:appointmentLocation:office')
  }

  const getDialogTitle = () => {
    return !isEdit 
      ? `${t('common:new2')} ${t('appointments:singularName').toLocaleLowerCase()}` 
      : `${t('common:edit')} ${t('appointments:singularName').toLocaleLowerCase()}`
  }

  const onSubmit = async (values: z.infer<typeof appointmentFormSchema>) => {
    // try {
    //   values.dateOfBirth = new Date(values.dateOfBirth).toISOString()
  
    //   if (!isEdit) {
    //     await createPatient(values)
    //     toast.success(t('common:created', { field: t('patients:singularName') }))
    //   } else {
    //     await editPatient(values)
    //     toast.success(t('common:edited', { field: t('patients:singularName') }))
    //   }
  
    //   form.reset()
    // } catch (ex: any) {
    //   toast.error(ex.message)
    // }
  }

  const createPatient = async (values: z.infer<typeof appointmentFormSchema>) => {
    // const { data: currentData, totalCount, setData } = usePatientStore.getState()
  
    // const response = await patientService.create(values)
    // const newData = [response.data, ...currentData]
  
    // setData(newData, (totalCount ?? 0) + 1)
  }

  const editPatient = async (values: z.infer<typeof appointmentFormSchema>) => {
    // const { data: currentData, totalCount, setData } = usePatientStore.getState()
  
    // await patientService.update(values)
  
    // const newData = currentData.map((patient) =>
    //   patient.id === values.id ? values : patient
    // )
  
    // setData(newData, totalCount ?? 0)
    // onOpenChange(false)
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

  // useEffect(() => {
  //   if (open) {
  //     const isEditing = !!dialogData
  //     setIsEdit(isEditing)
  
  //     const valuesToReset = {
  //       ...defaultValues,
  //       ...(dialogData ?? {})
  //     }
  
  //     if (isEditing) {
  //       valuesToReset.dateOfBirth = new Date(dialogData.dateOfBirth)
  //         .toISOString()
  //         .split('T')[0]
  //     }
  
  //     form.reset(valuesToReset)
  //   }
  // }, [open, dialogData])

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CalendarDays />
            <span className="ml-1">{getDialogTitle()}</span>
          </DialogTitle>
        </DialogHeader>
  
        <Separator />
        <div className="grid gap-4 py-4 p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left">{t('appointments:fields:startTime')}</FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss", { locale: ptBR })
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          disabled={(date) => date < new Date()}
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left">{t('appointments:fields:endTime')}</FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            disabled
                            variant="outline"
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss", { locale: ptBR })
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          disabled={(date) => date < new Date()}
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('appointments:fields:patient')}</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue 
                            placeholder={`${t('common:selectLabel')} ${t('appointments:fields:patient').toLocaleLowerCase()}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AppointmentLocationEnum).map((location) => (
                          <SelectItem key={location} value={location}>
                            {appointmentLocationEnumLabels[location]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointmentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('appointments:fields:location')}</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue 
                            placeholder={`${t('common:selectLabel')} ${t('appointments:fields:location').toLocaleLowerCase()}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AppointmentLocationEnum).map((location) => (
                          <SelectItem key={location} value={location}>
                            {appointmentLocationEnumLabels[location]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('appointments:fields:status')}</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[220px]">
                          <SelectValue 
                            placeholder={`${t('common:selectLabel')} ${t('appointments:fields:status').toLocaleLowerCase()}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AppointmentStatusEnum).map((status) => (
                          <SelectItem key={status} value={status}>
                            {appointmentStatusEnumLabels[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                  )}
                />
            </div>

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
      </DialogContent>
    </Dialog>
  )
}
