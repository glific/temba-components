// for cache busting we dynamically generate a fingerprint, use yarn svg to update
export const SVG_FINGERPRINT = '4895893f4a3a2f33536aaf322d65b4e3';

// only icons below are included in the sprite sheet
export enum Icon {
  analytics = 'bar-chart-01',
  account = 'user-01',
  active = 'play',
  add_note = 'file-02',
  airtime = 'bank-note-01',
  archive = 'archive',
  arrow_up = 'chevron-up',
  arrow_down = 'chevron-down',
  arrow_left = 'chevron-left',
  arrow_right = 'chevron-right',
  attachment = 'paperclip',
  broadcast = 'announcement-01',
  call = 'phone-call-01',
  call_missed = 'phone-call-02',
  campaign = 'clock-refresh',
  campaign_active = 'play',
  campaign_archived = 'archive',
  campaigns = 'clock-refresh',
  channel = 'zap',

  channel_android = 'channel-android',
  channel_clickatell = 'clickatell',
  channel_external = 'globe-02',
  channel_facebook = 'facebook-official',
  channel_freshchat = 'freshchat',
  channel_instagram = 'channel-instagram',
  channel_jiochat = 'jiochat',
  channel_junebug = 'junebug',
  channel_kannel = 'channel-kannel',
  channel_line = 'line',
  channel_mtarget = 'mtarget',
  channel_plivo = 'channel-plivo',
  channel_signalwire = 'signalwire',
  channel_thinq = 'thinq',
  channel_telegram = 'telegram',
  channel_twilio = 'channel-twilio',
  channel_twitter = 'twitter',
  channel_viber = 'viber',
  channel_vk = 'vk',
  channel_vonage = 'vonage',
  channel_wechat = 'wechat',
  channel_whatsapp = 'whatsapp',

  children = 'git-branch-01',
  check = 'check',
  checkbox = 'square',
  checkbox_checked = 'check-square',
  compose = 'send-01',
  colors = 'palette',
  contact = 'user-01',
  contact_archived = 'archive',
  contact_blocked = 'message-x-square',
  contact_stopped = 'slash-octagon',
  contact_updated = 'user-edit',
  contacts = 'user-01',
  conversation = 'message-chat-square',
  copy = 'copy-04',
  dashboard = 'pie-chart-01',
  delete = 'trash-03',
  delete_small = 'x',
  down = 'chevron-down',
  download = 'download-01',
  email = 'mail-01',
  error = 'alert-circle',
  event = 'zap',
  fields = 'user-edit',
  flow = 'flow',
  flow_interrupted = 'x-close',
  flow_ivr = 'phone-call-01',
  flow_message = 'message-square-02',
  flow_user = 'hard-drive',
  flows = 'flow',
  global = 'at-sign',
  group = 'users-01',
  group_smart = 'atom-01',
  help = 'help-circle',
  home = 'settings-02',
  image = 'image-01',
  inbox = 'inbox-01',
  incoming_call = 'phone-incoming-01',
  info = 'user-square',
  label = 'tag-01',
  language = 'globe-01',
  link = 'link-external-01',
  log = 'file-02',
  logout = 'log-out-04',
  menu = 'menu-01',
  menu_collapse = 'chevron-left-double',
  message = 'message-square-02',
  messages = 'message-square-02',
  missing = 'maximize-02',
  missed_call = 'phone-x',
  new = 'plus',
  notification = 'bell-01',
  org_active = 'credit-card-02',
  org_anonymous = 'glasses-01',
  org_bulk = 'credit-card-plus',
  org_flagged = 'flag-01',
  org_new = 'stars-02',
  org_suspended = 'slash-circle-01',
  org_verified = 'check-verified-02',
  overview = 'pie-chart-01',
  prometheus = 'prometheus',
  featured = 'star-01',
  referral = 'user-right-01',
  resthooks = 'share-07',
  restore = 'play',
  retry = 'refresh-cw-05',
  rocketchat = 'rocketchat',
  runs = 'rows-03',
  search = 'search-refraction',
  select_open = 'chevron-down',
  select_clear = 'x',
  service = 'magic-wand-01',
  service_end = 'log-out-04',
  settings = 'settings-02',
  sort = 'chevron-selector-vertical',
  staff = 'hard-drive',
  tickets = 'agent',
  tickets_all = 'archive',
  tickets_closed = 'check',
  tickets_mine = 'coffee',
  tickets_open = 'inbox-01',
  tickets_unassigned = 'inbox-01',
  topic = 'message-text-circle-02',
  two_factor_enabled = 'shield-02',
  two_factor_disabled = 'shield-01',
  trigger = 'signal-01',
  trigger_active = 'play',
  trigger_archived = 'archive',
  trigger_new = 'plus',
  triggers = 'signal-01',
  updated = 'edit-02',
  up = 'chevron-up',
  upload = 'upload-cloud-01',
  usages = 'link-04',
  user = 'users-01',
  users = 'users-01',
  user_beta = 'shield-zap',
  webhook = 'link-external-01',
  wit = 'wit',
  workspace = 'folder',
  zapier = 'zapier',
  zendesk = 'zendesk',

  ext = 'lightning-01',
  fcm = 'lightning-01',

  bothub = 'bothub',
  chatbase = 'chatbase',
  dtone = 'dtone',

  // demo
  default = 'list',
  datepicker = 'calendar',
  slider = 'sliders-02',
  select = 'browser',
  input = 'edit-05',
}
