/* eslint-disable @typescript-eslint/naming-convention */
export class Constants {
  static ROLE_MEMBER = 'member';

  static LOCAL_USER = 'localUser';
  static LOCAL_CAIXA = 'localCaixa';
  static MENU = 'menu';
  static MENU_HOME_PAGE = 'defaultMenuPage';
  static REGISTRING_USER = 'registringUser';
  static CURRENT_REGISTER_SESSION = 'currentRegisterSession';
  static TOKEN = 'token';
  static SIZE_ENCRIPTY_KEY = 25;
  static MALE_PERSON = './assets/images/male_person.webp';
  static FEMALE_PERSON = './assets/images/female_person.jpg';
  static PAGE_MENU_LOGIN = 'pageLogin';
  static PAGE_LOGIN = 0;
  static PAGE_REQUEST_EMAIL = 1;
  static PAGE_CODE_VALIDATION = 2;
  static PAGE_UPDATE_PASSWORD = 3;
  static RECOVER_USER = 'recoverUser';
  static IN_DEVELOPMENT = 'Ação em desenvolvimento! Aguarde novidades!';
  static IN_DEVELOPMENT_TITLE = 'Em desenvolvimento';
  static PAGE_ADMIN_REGISTER = '2';
  static PAGE_ADMIN_LIST_USER = '1';
  static PAGE_ADMIN_PROFILE = '0';
  static USER_SUPERIOR_LIMIT = 'upperUserLimit';
  static USER_INFERIOR_LIMIT = 'inferiorUserLimit';
  static USER_FILTER_LIST = ['Mês', 'Semana'];
  static USER_FILTER = 'userFilter';
  static TITHE_SUPERIOR_LIMIT = 'upperTitheLimit';
  static TITHE_INFERIOR_LIMIT = 'inferiorTitheLimit';
  static LOCAL_TITHE = 'localTithe';
  static TITHE_FILTER = 'titheFilter';
  static CAIXA_FILTER = 'caixaFilter';
  static FINANCY_SUMMARY_FILTER = 'financySummaryFilter';

  static PAGE_FINANCY_CAIXA = '0';
  static PAGE_FINANCY_TITHE = '1';
  static DEFAULT_ROLES = [
    'super_admin',
    'financial',
    'secretary',
    'counselor',
    'member',
  ];

  static CAIXA_TYPES = [
    'saída genérica',
    'entrada genérica',
    'salário',
    'Comunicação',
    'saneamento',
    'Energia',
    'ministério',
    'manutenção',
    'encargo social',
    'taxa',
    'previsionado',
    'patrimônio',
  ];

  static ENDPOINT_TITHE = 'tithes';

  static MENU_FINANCY_OPTION_TITHE = '0';
  static MENU_FINANCY_OPTION_SUMMARY = '1';
  static MENU_FINANCY_OPTION_CAIXA_REGISTER = '2';
  static MENU_FINANCY_OPTION_TITHE_REGISTER = '3';
  static TITHE_MAINTAINCE = 'titheMaintaince';
  static CAIXA_MAINTAINCE = 'caixatitheMaintaince';
  static USER_MAINTAINCE = 'userMaintaince';
  static MENU_USER_OPTION_PROFILE = '0';
  static MENU_USER_OPTION_MEMBERS = '1';
  static HAS_BACK_PAGE = 'hasBackPage';
  static USER_LETTER_SIZE_CONFIG = 'userLetterSizeConfig';
  static LATERAL_MENU_PERFIL = 'PERFIL';
  static LATERAL_MENU_TITHE_OFFER = 'DÍZIMOS E OFERTAS';
  static LATERAL_MENU_BIBLE_READ = 'LEITURA BÍBLICA';
  static LATERAL_MENU_OUT = 'SAIR';
  static LATERAL_MENU_MEMBERS = 'MEMBROS';
  static LATERAL_MENU_FINANCY = 'FINANCEIRO';
  static LATERAL_SUBMENU_TITHE_OFFER = 'Dízimos e Ofertas';
  static LATERAL_SUBMENU_SUMMARY = 'Resumo Financeiro';
  static SELECTED_BIBLE_PROGRAM_MAP = 'selectedBibleProramMap';
}
