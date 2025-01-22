package appointly.com.appointly_api.controller;

import appointly.com.appointly_api.controller.common.GenericController;
import appointly.com.appointly_api.dto.appointment.CreateAppointmentDTO;
import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("api/appointments")
@RequiredArgsConstructor
public class AppointmentController implements GenericController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Object> createNewAppointment(@RequestBody @Valid CreateAppointmentDTO dto) {
        Appointment patient = appointmentService.createNewAppointment(dto);
        URI location = generateHeaderLocation(patient.getId());
        return ResponseEntity.created(location).build();
    }
}
