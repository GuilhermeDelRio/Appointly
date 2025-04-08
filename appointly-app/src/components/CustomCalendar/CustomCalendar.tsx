import { useAppointmentStore } from '@/stores/appointmentStore'
import { useTranslation } from 'react-i18next'

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import {
  CalendarEventExternal,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
 
interface CustomCalendarProps {
  handleEventDragAndDrop: (updatedEvent: CalendarEventExternal) => void;
}

function CustomCalendar({ handleEventDragAndDrop }: CustomCalendarProps) {
  const { t } = useTranslation()
  const appointmentStore = useAppointmentStore()
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],

    calendars: {
      pending: {
        colorName: 'pending',
        lightColors: {
          main: '#f9d71c',
          container: '#fff5aa',
          onContainer: '#594800',
        }
      },
      canceled: {
        colorName: 'canceled',
        lightColors: {
          main: '#f91c45',
          container: '#ffd2dc',
          onContainer: '#59000d',
        }
      },
      completed: {
        colorName: 'completed',
        lightColors: {
          main: '#1cf9b0',
          container: '#dafff0',
          onContainer: '#42a297',
        }
      },
    },
    selectedDate: new Date().toISOString().split('T')[0],
    locale: 'pt-BR',
    isDark: false,
    weekOptions: {
      gridHeight: 4000
    },
    plugins: [
      eventsService,
      createEventModalPlugin(),
      createDragAndDropPlugin()
    ],
    callbacks: {
      onEventClick(calendarEvent) {
        console.log('onEventClick', calendarEvent)
      },
      onEventUpdate(updatedEvent) {
        handleEventDragAndDrop(updatedEvent)
      },
    }
  })
 
  useEffect(() => {
    const fetchEvents = async () => {
      const events = appointmentStore.data
        .filter((appointment) => appointment.id !== undefined)
        .map((appointment) => ({
          id: appointment.id as string,
          title: `${t(`appointments:appointmentStatus:${appointment.appointmentStatus.toLowerCase()}`)}`,
          start: formatDate(appointment.initialDate),
          end: formatDate(appointment.endDate),
          location: t(`appointments:appointmentLocation:${appointment.appointmentLocation.toLowerCase()}`),
          calendarId: appointment.appointmentStatus.toLowerCase(),
          people: [`${appointment.patient.firstName} ${appointment.patient.lastName}`],
          patientId: appointment.patient.id,
        }))
      
      eventsService.set(events)
    }

    fetchEvents()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default CustomCalendar