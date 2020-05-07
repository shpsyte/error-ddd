import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const checkIfExists = await this.appointmentsRepository.finByDate(
      appointmentDate
    );

    if (checkIfExists) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentServices;
