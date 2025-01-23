package appointly.com.appointly_api.controller;

import appointly.com.appointly_api.controller.common.GenericController;
import appointly.com.appointly_api.dto.appointment.ReadAppointmentDTO;
import appointly.com.appointly_api.dto.appointment.AppointmentDTO;
import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("api/appointments")
@RequiredArgsConstructor
public class AppointmentController implements GenericController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Object> createNewAppointment(@RequestBody @Valid AppointmentDTO dto) {
        Appointment patient = appointmentService.createNewAppointment(dto);
        URI location = generateHeaderLocation(patient.getId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<ReadAppointmentDTO> getAppointmentById(@PathVariable String id) {
        ReadAppointmentDTO dto = appointmentService.getAppointmentById(UUID.fromString(id));
        return ResponseEntity.ok(dto);
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateAppointment(
            @PathVariable("id") String id,
            @RequestBody @Valid AppointmentDTO dto) {

        UUID appointmentId = UUID.fromString(id);
        appointmentService.updateAppointment(appointmentId, dto);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteAppointment(@PathVariable String id) {
        appointmentService.deleteAppointment(UUID.fromString(id));
        return ResponseEntity.noContent().build();
    }
}
