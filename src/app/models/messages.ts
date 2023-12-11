/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantMessages {
  //User register
  static NAME_INVALID = 'Insira um nome válido (Nome e sobrenome)';
  static NAME_INVALID_NOT_LETTERS =
    'O nome deve conter apenas letras. Não use caracteres especiais e/ou números';
  static NAME_INVALID_SPACE =
    'Existe um espaço a mais entre o nome e o sobrenome ou você esqueceu o sobrenome';
  static PHONE_INVALID = 'Insira um celular válido';
  static BIRTHDATE_INVALID = 'Insira sua data de nascimento';
  static MARITAL_STATUS_INVALID = 'Selecione um estado civil';
  static INPUT_METHOD_INVALID = 'Selecione a forma como entrou na igreja';
  static ISBAPTIZED_INVALID = 'Você já é batizado? Marque SIM ou NÃO';
  static GENDER_INVALID = 'Qual o seu gênero? Marque Masculino ou Feminino';
  static CHURCH_INVALID = 'Selecione o templo onde tem frequentado';
  static CHURCH_INVALID_FINANCY =
    'Este usuário não está associado à uma organização. Faça a regularização do seu cadastro e tente novamente';

  //Contact register constants
  static STREET_INVALID = 'É necessário inserir um logradouro (Rua, AV., Trv.)';
  static DISTRICT_INVALID = 'É necessário inserir um bairro';
  static HOUSENUMBER_INVALID =
    'É necessário inserir um número de residência ou marcar a opção sem número';

  static FINISHING_REGISTRATION_TITLE = 'CADASTRO REALIZADO COM SUCESSO!';

  static FINISHING_REGISTRATION_SUCCESS =
    'Parabéns! Você realizou seu cadastro com sucesso! Agora você pode clicar no menu LOGIN e acessar sua conta usando seu email e senha.';

  static FINISHING_ADMIN_REGISTRATION_SUCCESS =
    'Parabéns! Você realizou o cadastro com sucesso! ';

  //caixa register
  static AMOUNT_INVALID = 'Digite um valor válido';
  static DAY_INVALID = 'Selecione um dia válido';
  static MONTH_YEAR_INVALID = 'Selecione um mês e ano válidos';
  static DATE_INVALID = 'Selecione uma data válida';
  static TYPE_DATE_VALIDE = 'Digite uma dada válida';
  static CAIXA_SUBCATEGORY_INVALID = 'Selecione uma subcategoria';
  static CAIXA_CATEGORY_INVALID = 'Selecione uma categoria';
  static CAIXA_CHURCH_INVALID = 'Selecione uma organização';
  static INPUT_OUTPUT_INVALID = 'Selecione se é ENTRADA ou SAÍDA';
  static TITHE_TYPE_INVALID = 'Selecione se é DÍZIMO ou OFERTA';
  static TITHE_USER_INVALID = 'Selecione um usuário';
  static CAIXA_DESCRIPTION_INVALID =
    'Digite uma descrição ou o motivo do registro de saída';
  static CAIXA_WALLET_INVALID = 'Selecione uma carteira';

  static MSG_MAX_LIMIT_LETTER = 'Limite atingido';
  static WHATSAPP_INVITE_SHARE = `Olá! Que a paz do Senhor esteja com você! Clica ai no link e vem conhecer nosso App...
    A Igreja Batista Nova Betel, uma família para você!`;

  static GENERIC_NAME_INVALID = 'Insira um nome válido';
  static USER_INVALID = 'Selecione um usuário';
  static MEMBER_INVALID = 'Selecione um Membro';
  static USER_ALREADY_EXISTS =
    'Esse registro já existe e será selecionado automaticamente na lista ao fechar essa mensagem';

  static TITILE_INVALID = 'Por favor, Insira um título válido';
  static LEGEND_INVALID = 'Por favor, Insira uma legenda';
  static TIME_INVALID = 'Por favor, Insira um horário válido';
  static CHURCH_SCHEDULE_INVALID_CHURCH =
    'Por favor, Selecione uma organização';
  static FILE_LIMIT = 'Limitado a 1 (um) arquivo';
  static INVALID_WALLET = 'Selecione uma Conta';
  static INVALIDE_DATE_INTERVAL =
    'Selecione a data de inicio e fim da consulta';
  static ENDED_SESSION = 'Sessão Expirada. Tente novamente';
  static CONFIRM_DELETE = 'Tem certeza que deseja excluir esse item?';
  static ACTION_SUCCESS_PERFORMED = 'Ação Excecutada com sucesso!';
}
