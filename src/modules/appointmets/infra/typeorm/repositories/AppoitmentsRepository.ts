import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import IAppontmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import ICreateAppointmentDTO from '@modules/appointmets/dtos/ICreateAppointmentDTO';

class AppointmentRepository implements IAppontmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmet = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointmet);

    return appointmet;
  }

  public async finByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentRepository;
