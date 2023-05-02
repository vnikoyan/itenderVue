<template>
    <div id="settings" class="h-100">
        <div v-if="isPrivate" class="row m-0 p-0 h-100">
            <div class="col-lg-4 p-0">
                <div class="row align-items-start m-0 p-0">
                    <div class="col-12 p-0">
                        <user-settings />
                    </div>
                    <div v-if="isPrivate" class="col-lg-12 p-0" id="tax-type">
                        <taxType />
                    </div>
                    <div class="col-12 p-0" id="status">
                        <packageType />
                    </div>
                    <div class="col-lg-12 p-0" id="change-password">
                        <changePassword />
                    </div>
                    <div class="col-12 p-0" id="state-category">
                        <UserFilters />
                    </div>
                    <div class="col-12 p-0" id="email-notification">
                        <emailNotification />
                    </div>
                </div>
            </div>
            <div class="col-lg-8 p-0 padding-l-20" id="personal-settings">
                <div class="row m-0 p-0 h-100">
                    <div class="col-12 p-0" id="state-category">
                        <SelectCategory/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-lg-6">
                <div class="row align-items-start">
                    <div class="col-12">
                        <organisationSettings/>
                    </div>
                    <div class="col-12" id="status">
                        <packageType />
                    </div>
                </div>
            </div>
            <div class="col-lg-6" id="personal-settings">
                <div class="row">
                    <div class="col-lg-12" id="change-password">
                        <personalSettings/>
                    </div>
                    <div class="col-lg-12" id="change-password">
                        <changePassword />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import personalSettings from './partials/personalSettings'
import organisationSettings from './partials/organisationSettings'
import changePassword from './partials/changePassword'
import taxType from './partials/taxType'
import packageType from './partials/packageType'
import emailNotification from './partials/emailNotification'
import UserSettings from './partials/userSettings'
import UserFilters from './partials/userFilters'
import SelectCategory from '@/views/private/category'

export default {
    components: { packageType, personalSettings, changePassword, taxType, organisationSettings, UserSettings, SelectCategory, UserFilters, emailNotification},
    computed: {
        me() {
            return this.$store.getters['user/me']
        },
        user() {
            return this.$store.getters['user/me']
        },
        userType(){
            return this.$store.getters.userType
        } 
    },
    data () {
        return {
            isPrivate: this.$store.getters.userType === 'USER',
        }
    },
    methods: {},
    name: 'Settings',
  }
</script>
<style scoped>
    .free-period{
        background-color: #43B4B2;
        border-radius: 50px;
        padding: 8px 15px;
        font-weight: 400;
        font-size: 13px;
        line-height: 28px;
        color: #FFFFFF;
        cursor: pointer;
    }

    @media only screen and (max-width: 760px) {
        .padding-l-20{
            padding: 0 !important;
        }
    }

    
</style>