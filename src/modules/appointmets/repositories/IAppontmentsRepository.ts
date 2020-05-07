import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointmets/dtos/ICreateAppointmentDTO';

export default interface IAppontmentsRepository {
  finByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
