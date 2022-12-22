/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantMessages {
  //User register
  static NAME_INVALID = 'Insira um nome válido (Nome e sobrenome)';
  static NAME_INVALID_SPACE =
    'Existe um espaço a mais entre o nome e o sobrenome ou você esqueceu o sobrenome';
  static PHONE_INVALID = 'Insira um celular válido';
  static BIRTHDATE_INVALID = 'Insira sua data de nascimento';
  static MARITAL_STATUS_INVALID = 'Selecione um estado civil';
  static INPUT_METHOD_INVALID = 'Selecione a forma como entrou na igreja';
  static ISBAPTIZED_INVALID = 'Você já é batizado? Marque SIM ou NÃO';
  static GENDER_INVALID = 'Qual o seu gênero? Marque Masculino ou Feminino';
  static CHURCH_INVALID = 'Selecione o templo onde tem frequentado';

  //Contact register constants
  static STREET_INVALID = 'É necessário inserir um logradouro (Rua, AV., Trv.)';
  static DISTRICT_INVALID = 'É necessário inserir um bairro';
  static HOUSENUMBER_INVALID =
    'É necessário inserir um número de residência ou marcar a opção sem número';

  static FINISHING_REGISTRATION_TITLE = 'CADASTRO REALIZADO COM SUCESSO!';

  static FINISHING_REGISTRATION_SUCCESS =
    'Parabéns! Você realizou seu cadastro com sucesso! Agora você pode clicar no menu LOGIN e acessar sua conta usando seu email e senha.';

  //caixa register
  static AMOUNT_INVALID = 'Digite um valor válido';
  static DAY_INVALID = 'Selecione um dia válido';
  static MONTH_YEAR_INVALID = 'Selecione um mês e ano válidos';
  static CAIXA_TYPE_INVALID = 'Selecione um tipo';
  static INPUT_OUTPUT_INVALID = 'Selecione se é ENTRADA ou SAÍDA';
  static TITHE_TYPE_INVALID = 'Selecione se é DÍZIMO ou OFERTA';
  static CAIXA_DESCRIPTION_INVALID = 'Digite o motivo do registro de saída';

  static MSG_MAX_LIMIT_LETTER = 'Limite atingido';
}
