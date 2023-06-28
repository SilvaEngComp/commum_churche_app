/* eslint-disable @typescript-eslint/naming-convention */
export class Constants {
  static ROLE_MEMBER = 'member';
  static ROLE_SUPER_ADMIN = 'super_admin';
  static ROLE_FINANCIAL = 'financial';
  static ROLE_SECRETARY = 'secretary';
  static ROLE_MULTIMIDIA = 'multimidia';
  static MENU_HOME = 'menuHome';

  static LOCAL_USER = 'localUser';
  static LOCAL_CAIXA = 'localCaixa';
  static MENU = 'menu';
  static MENU_HOME_PAGE = 'defaultMenuPage';
  static REGISTRING_USER = 'registringUser';
  static REGISTRING_USER_SUBSESSION = 'registringUserSubsession';
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
  static PAGE_ADMIN_BIRTHDAYS = '4';
  static PAGE_ADMIN_REGISTER = '3';
  static PAGE_ADMIN_LIST_USER = '2';
  static PAGE_ADMIN_USER_HOME = '1';
  static PAGE_ADMIN_PROFILE = '0';
  static USER_SUPERIOR_LIMIT = 'upperUserLimit';
  static USER_INFERIOR_LIMIT = 'inferiorUserLimit';
  static USER_PAGE_NUMBER = 'usersPageNumber';
  static USER_FILTER_LIST = ['Mês', 'Semana'];
  static USER_FILTER = 'userFilter';
  static TITHE_SUPERIOR_LIMIT = 'upperTitheLimit';
  static TITHE_INFERIOR_LIMIT = 'inferiorTitheLimit';
  static LOCAL_TITHE = 'localTithe';
  static TITHE_FILTER = 'titheFilter';
  static CAIXA_FILTER = 'caixaFilter';
  static FINANCY_SUMMARY_FILTER = 'financySummaryFilter';
  static FINANCY_REPORT_FILTER = 'financyReportFilter';

  static PAGE_FINANCY_CAIXA = '0';
  static PAGE_FINANCY_TITHE = '1';

  static SUPER_ADMIN = 'super_admin';
  static FINANCIAL = 'financial';
  static SECRETARY = 'secretary';
  static CONSELOR = 'counselor';
  static MEMBER = 'member';

  static DEFAULT_ROLES = [
    Constants.SUPER_ADMIN,
    Constants.FINANCIAL,
    Constants.SECRETARY,
    Constants.CONSELOR,
    Constants.MEMBER,
  ];

  static ENDPOINT_TITHE = 'tithes';
  static ENDPOINT_CHURCH_SCHEDULE_TIME = 'churchScheduleTypes';

  static MENU_BACK = '-1';
  static MENU_GENERAL_OPTION_MORE = '3';
  static MENU_GENERAL_OPTION_USER = '1';
  static MENU_GENERAL_OPTION_FEED = '0';

  static PAGE_CONTROLL_FINANCY_ADMIN = 'financy-subpage';
  static PAGE_CONTROLL_SECRETARY_ADMIN = 'secretary-subpage';

  static MENU_FINANCY_OPTION_TITHE = '0';
  static MENU_FINANCY_OPTION_SUMMARY = '1';
  static MENU_FINANCY_OPTION_CAIXA_REGISTER = '2';
  static MENU_FINANCY_OPTION_TITHE_REGISTER = '3';
  static MENU_FINANCY_OPTION_BALANCE = '4';
  static MENU_FINANCY_OPTION_EXPENSE = '5';
  static MENU_FINANCY_OPTION_REPORT = '6';
  static MENU_FINANCY_EXCEL_REGISTER = '7';
  static MENU_FINANCY_CATEGORY_MENAGER = '8';

  static OFFER_MAINTAINCE = 'offerMaintaince';
  static TITHE_MAINTAINCE = 'titheMaintaince';
  static CAIXA_MAINTAINCE = 'caixatitheMaintaince';
  static USER_MAINTAINCE = 'userMaintaince';
  static CAIXA_WALLET = 'caixaWallet';
  static WALLET_FLUX_ID = 1;
  static WALLET_PROVISIONED_ID = 2;
  static MENU_USER_OPTION_PROFILE = '0';
  static MENU_USER_OPTION_MEMBERS = '1';
  static HAS_BACK_PAGE = 'hasBackPage';
  static USER_LETTER_SIZE_CONFIG = 'userLetterSizeConfig';
  static SUPERIOR_MENU_HOME = 'HOME';
  static SUPERIOR_MENU_BIRTHDAYS = 'ANIVERSARIANTES';
  static SUPERIOR_MENU_REGISTER = 'CADASTRO';
  static SUPERIOR_MENU_LOGIN = 'LOGIN';
  static LATERAL_MENU_TITHE_OFFER = 'DÍZIMOS E OFERTAS';
  static LATERAL_MENU_PROFILE = 'PERFIL';
  static LATERAL_MENU_BIBLE_READ = 'LEITURA BÍBLICA';
  static LATERAL_MENU_FEED = 'FEED DE NOTÍCIAS';
  static LATERAL_MENU_PROGRAM = 'PROGRAMAÇÕES';
  static LATERAL_MENU_OUT = 'SAIR';
  static LATERAL_MENU_MEMBERS = 'MEMBROS';
  static LATERAL_MENU_FINANCY = 'FINANCEIRO';
  static LATERAL_SUBMENU_TITHE_OFFER = 'Dízimos e Ofertas';
  static LATERAL_SUBMENU_SUMMARY = 'Resumo Financeiro';
  static SELECTED_BIBLE_PROGRAM_MAP = 'selectedBibleProramMap';
  static SELECTED_BIBLE_PROGRAM_READERS = 'selectedBibleProramReaders';
  static OPTION_EDIT = 'EDITAR';
  static OPTION_DELETE = 'EXCLUIR';
  static NEW_RETISTRATION = 'CADASTRAR NOVO';
  static SHOW_GRAPH = 'GRÁFICOS';
  static BACK_PAGE = 'backPage';
  static IS_TITHE = 'isTithe';
  static IS_ENTRY = 'isEntry';

  static SELECTED_VERSE_DAY = 'selectedVerseDay';
  static SELECTED_MONTH_PROGRAM = 'monthProgram';
  static SELECTED_PROGRAM = 'selectedProgram';
  static BIBLE_PROGRAM_MENU_VERSE_DAY = '2';
  static BIBLE_PROGRAM_MENU_READ_DAY = '1';
  static BIBLE_PROGRAM_MENU_PLAN = '3';
  static BIBLE_PROGRAM_MENU_MAP = '4';
  static BIBLE_PROGRAM_MENU_READERS = '5';
  static BIBLE_PROGRAM_SUBPAGE = 'bible-program-subpage';

  static TITLE_CURRENT_PAGE = 'currentPageTitle';
  static TITLE_DAILY_READER = 'Leitura Bíblica';
  static TITLE_SUMMARY_FINANCY_SUB = 'Resumo Financeiro';
  static TITLE_SUMMARY_FINANCY_REPORT = 'Relatório Financeiro';
  static TITLE_SUMMARY_REGISTER_BY_EXCEL = 'Registro Via Planilha';
  static TITLE_SUMMARY_MANAGER_CATEGORY = 'Gerenciar Categoria e Subcategoria';
  static TITLE_SUMMARY_BALANCE = 'Receitas';
  static TITLE_BIRTHDAYS = 'Aniversariantes';
  static TITLE_SUMMARY_EXPANSE = 'Saídas';
  static TITLE_SUMMARY_FINANCY = 'Tesouraria';
  static TITLE_SECRETARY = 'Sercretaria';
  static TITLE_USER_PROFILE = 'PERFIL';
  static TITLE_USER_MEMBERS = 'LISTA DE MEMBROS';
  static TITLE_USER_REGISTER = 'Cadastro de Membro';
  static TITLE_TITHE_HISTORIC = 'DÍZIMOS E OFERTAS';
  static TITLE_TITHE_HISTRIC = 'LISTA DE MEMBROS';
  static TITLE_CAIXA_REGISTER_OUT = 'REGISTRAR SAÍDA';
  static TITLE_CAIXA_REGISTER_IN = 'REGISTRAR ENTRADA';
  static TITLE_TITHE_REGISTER = 'REGISTRAR DÍZIMO';
  static TITLE_OFFER_REGISTER = 'REGISTRAR OFERTA';
  static TITLE_FEED_REGISTER = 'FEED NOTÍCIAS';
  static TITLE_CHURCH_SCHEDULE_REGISTER = 'PROGRAMAÇÕES';
  static FCM_TOKEN = 'fcmToken';
  static COLOR_TRANSPARENT = 'transparent';

  static TITLE_FEED_CREATE_FEED = 'CRIAR NOVA PUBLICAÇÃO';
  static TITLE_FEED_NEWS_FEED = 'Notícias';

  static FEED_SUBPAGE = 'feed-subpage';
  static FEED_PAGE_PUBLIC = '1';
  static FEED_PAGE_HOME = '0';
  static FEED_PAGE_CREATE_FEED = '2';
  static FEED_PAGE_PUBLICATION = '3';
  static FEED_PAGE_COMMENT = '4';
  static FEED_ATTRIBUTES_FEED_OBJECT = 'storedFeed';
  static FEED_ATTRIBUTES_FEED_SESSION = 'feedSession';

  static CHURCH_SCHEDULE_SUBPAGE = 'schedule-subpage';
  static CHURCH_SCHEDULE_PAGE_PUBLIC = '1';
  static CHURCH_SCHEDULE_PAGE_CREATE_SCHEDULE = '2';
  static CHURCH_SCHEDULE_PAGE_PUBLICATION = '3';
  static CHURCH_SCHEDULE_PAGE_COMMENT = '4';
  static CHURCH_SCHEDULE_ATTRIBUTES_OBJECT = 'storedFeed';
  static DAYS_OF_WEEK = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ];

  static TITHE_MENU_OPTION_TITHE = 'DÍZIMO';
  static TITHE_MENU_OPTION_OFFER = 'OFERTA';
  static INVALID_OPTION = 'Opção inválida';
  static INVALID_EMAIL = 'Email inválido. Verifique o email e tente novamente!';
  static CHURCH_SCHEDULE_SELECTED_FILTER = 'churchScheduleSelectedFilter';
  static IS_COLOR_MANAGER_OPPENED = 'isColorManagerOppened';
  static ELEMENT_MARKER_REF = 'elementMarkerRef';
  static ELEMENT_MARKER_RENDERER = 'elementMarkerRenderer';
  static LOCALSTORAGE_REQUEST_EMAIL = 'localStorageRequestEmail';
  static TITHE_REPORT_HEADER = ['VALOR', 'DATA', 'DIZIMISTA', 'TESOUREIRO', ''];
  static OFFER_REPORT_HEADER = ['VALOR', 'DATA', 'OFERTANTE', 'TESOUREIRO', ''];
  static CAIXA_REPORT_HEADER = [
    'VALOR',
    'DATA',
    'CATEGORIA',
    'SUBCATEGORIA',
    'DESCRIÇÃO',
    'TESOUREIRO',
    '',
  ];
  static TITHE_REPORT_HEADER_MODEL = ['REF.', 'DIZIMISTA', 'VALOR', 'DATA', ''];
  static OFFER_REPORT_HEADER_MODEL = ['REF.', 'OFERTANTE', 'VALOR', 'DATA', ''];
  static CAIXA_REPORT_HEADER_MODEL = [
    'VALOR',
    'DATA',
    'CATEGORIA',
    'SUBCATEGORIA',
    'DESCRIÇÃO',
    '',
  ];
  static CATEGORY_REPORT_HEADER_MODEL = ['CATEGORIA', '', ''];
  static TYPE_REPORT_HEADER_MODEL = ['SUBCATEGORIA', ''];

  static FINANCY_REPORT_INPUT = 'financyReportInput';
  static FINANCY_REPORT_OUTPUT = 'financyReportOutput';
  static FINANCY_REPORT_GENERAL = 'financyReportGeneral';
  static SELECTED_VERSES_PRESSED = 'selectedVesesPressed';
  static MENU_HOME_USER_REGISTRATION = 1;
  static MENU_HOME_BIRTHDAY = 2;
  static MENU_HOME_LOGIN = 3;
  static MENU_HOME_USER_REGISTRATION_BY_LOGIN = 4;
  static HOME_SELECT_PAGE = 'homeSelectPage';
  static SECRETARY_FOLDER = 'secretaria';
  static FINANCIAL_FOLDER = 'tesouraria';
}
