using Appointly.Application.Features.PatientFeatures.Commands.CreatePatient;
using Appointly.Domain.Entities;
using AutoMapper;

namespace Appointly.Application.Mappers;

public sealed class PatientMapper : Profile 
{
    public PatientMapper()
    {
        CreateMap<CreatePatientRequest, Patient>();
        CreateMap<Patient, CreatePatientResponse>();
    }
}