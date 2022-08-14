import { Role } from '../models/role.js';
import { User } from '../models/user.js';

const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({ role });
    if ( !existeRole ) {
      throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
}

const emailExiste = async(email = '') => {
  // Verifica si el email esta registrado
  const existeEmail = await User.findOne({ email });
  if ( existeEmail ) {
    throw new Error(`El email ${email} ya esta registrado en la BD`);
  }
}

export { 
  esRoleValido,
  emailExiste
}