<template>
    <div class="card" :class="open ? 'opened' : ''">
        <div class="card-header">
          <button @click="() => open = !open" class="d-flex w-100 justify-content-between align-items-center" type="button" data-toggle="collapse" data-target="#emailNotificationCollapse" aria-expanded="false" aria-controls="emailNotificationCollapse">
            <h4 data-target="#emailNotificationCollapse" aria-expanded="false" aria-controls="emailNotificationCollapse" class="mb-0">Էլեկտրոնային ծանուցումներ</h4>
            <svg width="14" height="8" viewBox="0 0 14 8">
              <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
            </svg>
          </button>
        </div>
        <div id="emailNotificationCollapse" class="collapse multi-collapse">
          <div class="card-body d-flex flex-column padding-20">
              <p class="text-muted">
                  Նշեք էլեկտրոնային ծանուցումներ ստանալու նախընրտելի տարբերակը
              </p>
              <div class="col">
                <!-- <button @click="activateTelegram" type="button" class="btn btn-primary" data-toggle="modal" data-animation="bounce">
                  <span class="mr-2">Ակտիվացնել ծանուցումները Telegram-ով</span>
                  <svg width='22' height='22' xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path d="M22.26465,2.42773a2.04837,2.04837,0,0,0-2.07813-.32421L2.26562,9.33887a2.043,2.043,0,0,0,.1045,3.81836l3.625,1.26074,2.0205,6.68164A.998.998,0,0,0,8.134,21.352c.00775.012.01868.02093.02692.03259a.98844.98844,0,0,0,.21143.21576c.02307.01758.04516.03406.06982.04968a.98592.98592,0,0,0,.31073.13611l.01184.001.00671.00287a1.02183,1.02183,0,0,0,.20215.02051c.00653,0,.01233-.00312.0188-.00324a.99255.99255,0,0,0,.30109-.05231c.02258-.00769.04193-.02056.06384-.02984a.9931.9931,0,0,0,.20429-.11456,250.75993,250.75993,0,0,1,.15222-.12818L12.416,18.499l4.03027,3.12207a2.02322,2.02322,0,0,0,1.24121.42676A2.05413,2.05413,0,0,0,19.69531,20.415L22.958,4.39844A2.02966,2.02966,0,0,0,22.26465,2.42773ZM9.37012,14.73633a.99357.99357,0,0,0-.27246.50586l-.30951,1.504-.78406-2.59307,4.06525-2.11695ZM17.67188,20.04l-4.7627-3.68945a1.00134,1.00134,0,0,0-1.35352.11914l-.86541.9552.30584-1.48645,7.083-7.083a.99975.99975,0,0,0-1.16894-1.59375L6.74487,12.55432,3.02051,11.19141,20.999,3.999Z"/></svg>
                </button> -->
                <vue-telegram-login 
                  mode="callback"
                  telegram-login="iTenderNotificationBot"
                  @callback="telegramCallbackFunction" 
                  requestAccess="write"
                  radius="12"
                />
                <span v-if="telegram_id">
                  <i class="fa-solid fa-circle-check text-primary"></i>
                  <span class="small ml-2">կա կցված Telegram</span>
                </span>
              </div>
              <div class="p-3">
                <div class="form-check-inline">
                  <input v-model="$v.fields.email_notification.$model" class="form-check-input m-0" type="checkbox" :value="1" id="notification-email">
                  <label class="form-check-label" for="notification-email">
                    Ստանալ ծանուցումները Էլեկտրոնային փոստով
                  </label>
                </div>
                <div class="form-check-inline">
                  <input v-model="$v.fields.telegram_notification.$model" class="form-check-input m-0" type="checkbox" :value="0" id="notification-telegram" >
                  <label class="form-check-label" for="notification-telegram">
                    Ստանալ ծանուցումները Telegram-ով
                  </label>
                </div>
                  <!-- <form class="form-parsley" action="#" novalidate=""> -->
                      <!-- <div class="form-group radio">
                          <input v-model="$v.fields.email_notification.$model" type="radio" id="email_notification_1" value="1" name="radioInline" checked="true">
                          <label for="email_notification_1">Ամեն անգամ նոր տենդեր տեղադելուց</label>
                      </div>
                      <div class="form-group radio">
                          <input v-model="$v.fields.email_notification.$model" type="radio" id="email_notification_2" value="0" name="radioInline">
                          <label for="email_notification_2">Ծանուցում չգնա</label>
                      </div> -->
                      <!-- <div class="radio">
                          <input v-model="$v.fields.email_notification.$model" type="radio" id="email_notification_3" value="time" name="radioInline">
                          <label for="email_notification_3">Ծանուցում գնա օրական 1 անգամ</label>
                      </div> -->
                  <!-- </form> -->
                  <!-- <div v-if="$v.fields.email_notification.$model === 'time'" class="pl-3 pt-2">
                    <form class="form-parsley" action="#" novalidate="">
                        <div class="form-group radio">
                            <div>
                              <input v-model="$v.fields.email_notification_time.$model" type="radio" id="email_notification_time_1" value="10:00" name="radioInline" checked="">
                              <label class="mr-3" for="email_notification_time_1">10:00</label>
                              <input v-model="$v.fields.email_notification_time.$model" type="radio" id="email_notification_time_2" value="19:00" name="radioInline">
                              <label for="email_notification_time_2">19:00</label>
                            </div>
                        </div>
                    </form>
                </div> -->
              </div>
              <div class="bg-white w-100 pr-0 text-right" style="bottom: 0">
                <button @click="save" type="button" class="btn btn-primary  waves-effect waves-light float-right" data-toggle="modal" data-animation="bounce">
                  <span>Պահպանել</span>
                </button>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import {vueTelegramLogin} from 'vue-telegram-login'

export default {
  name: 'emailnotification',
  components: {vueTelegramLogin},
  data () {
    return {
      open: false,
      email_with_time: '1',
      telegram_id: false,
      fields: {
        email_notification: 1,
        telegram_notification: 0,
        email_notification_time: '10:00',
      }
    }
  },
  mounted(){
    console.log('email_notifications', this.me.email_notifications)
    console.log('telegram_notifications', this.me.telegram_notifications)
    this.telegram_id = this.me.telegram_id
    this.fields.email_notification = this.me.email_notifications
    this.fields.telegram_notification = this.me.telegram_notifications
    this.fields.email_notification_time = this.me.email_notifications_time !== '' ? this.me.email_notifications_time : '10:00'
  },
  validations: {
    fields: {
      email_notification: { required },
      telegram_notification: { required },
      email_notification_time: {  },
    },
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  watch: {
    me: function(updatedMe) {
      console.log('email_notifications', this.me.email_notifications)
      console.log('telegram_notifications', this.me.telegram_notifications)
      this.fields.email_notification = this.me.email_notifications
      this.fields.telegram_notification = this.me.telegram_notifications
      this.telegram_id = this.me.telegram_id
      // this.fields.email_notification = updatedMe.email_notifications !== '' ? 1 : updatedMe.email_notifications ? 1 : 0
      // this.fields.telegram_notification = updatedMe.telegram_notifications !== '' ? 1 : updatedMe.telegram_notifications ? 1 : 0
      this.fields.email_notification_time = updatedMe.email_notifications_time !== '' ? updatedMe.email_notifications_time : '10:00'
    }
  },
  methods: {
    telegramCallbackFunction(result){
      this.$client.post('user/connect-telegram', result).then((data) => {
        console.log(data)
      })
    },
    consoleLog(e){
      console.log(e)
    },
    save() {
      const data = {...this.fields};
      console.log(data)
      // if(data.email_notification !== 'time'){
      //   data.email_notification = +data.email_notification;
      //   data.email_notification_time = null;
      // } else {
      //   data.email_notification = 1;
      // }
      this.$client.post('email/notification', {...data}).then((value) => {
        this.$notify({
          group: 'foo',
          type: 'success',
          text: 'Հաջողությամբ պահպանված է'
        })
      })
    },
  },
}
</script>
<style scoped>
.card{
  margin-bottom: 12px;
}
</style>