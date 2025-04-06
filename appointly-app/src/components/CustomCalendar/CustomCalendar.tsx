import { useAppointmentStore } from '@/stores/appointmentStore'

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
 
function CustomCalendar() {
  const appointmentStore = useAppointmentStore()
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
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
          main: '#f91c45',
          container: '#ffd2dc',
          onContainer: '#59000d',
        }
      },
    },
    selectedDate: new Date().toISOString().split('T')[0],
    locale: 'pt-BR',
    isDark: false,
    weekOptions: {
      gridHeight: 3000
    },
    plugins: [
      eventsService,
      // createEventModalPlugin(),
      createDragAndDropPlugin()
    ],
    callbacks: {
      onEventClick(calendarEvent) {
        console.log('onEventClick', calendarEvent)
      }
    }
  })
 
  useEffect(() => {
    const fetchEvents = async () => {
      const events = appointmentStore.data
        .filter((appointment) => appointment.id !== undefined)
        .map((appointment) => ({
          id: appointment.id as string,
          title: `Appointment - ${appointment.patient.firstName} ${appointment.patient.lastName}`,
          start: formatDate(appointment.initialDate),
          end: formatDate(appointment.endDate),
          description: 'Appointment description',
          location: appointment.appointmentLocation.toLocaleLowerCase(),
          calendarId: appointment.appointmentStatus.toLocaleLowerCase(),
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