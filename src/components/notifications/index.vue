<template>
    <notifications group="foo" position="top right">
        <template slot="body" slot-scope="props">
            <div class="notification-body">
                <div class="col-auto">
                    <template v-if="props.item.type === 'error'">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2890_30191)">
                        <circle cx="12" cy="12" r="12" fill="#E02232"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4774 16.8361L16.8364 18.4771L11.9996 13.6403L7.16251 18.4774L5.52148 16.8364L10.3586 11.9993L5.52265 7.16338L7.16367 5.52236L11.9996 10.3583L16.8352 5.52272L18.4762 7.16374L13.6406 11.9993L18.4774 16.8361Z" fill="#F0F7FF"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2890_30191">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </template>
                    <template v-else-if="props.item.type === 'success'">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2890_1109)">
                        <circle cx="12" cy="12" r="12" fill="#2DB63E"/>
                        <path d="M20 7.91447L10.1308 17.75L4 11.5461L5.64486 9.88158L10.1308 14.5724L18.3551 6.25L20 7.91447Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2890_1109">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </template>
                    <template v-else>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2890_30200)">
                        <circle cx="12" cy="12" r="12" fill="#006BE6"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9996 8.14026C12.9055 8.14026 13.6399 7.40589 13.6399 6.5C13.6399 5.59411 12.9055 4.85974 11.9996 4.85974C11.0937 4.85974 10.3594 5.59411 10.3594 6.5C10.3594 7.40589 11.0937 8.14026 11.9996 8.14026ZM13.1611 19.1403H10.8403V10.1403H13.1611V19.1403Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2890_30200">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </template>
                </div>
                <div class="col">
                    <span class="notification-title">
                        {{props.item.title}}
                    </span>
                    <div class="notification-text" v-html="props.item.text" />
                </div>
            </div>
        </template>
    </notifications>
</template>

<script>
export default {
  name: 'NotificationAlert',
  components: {},
}
</script>
<style>
.vue-notification-group{
    top: 96px !important;
}
</style>
<style scoped>
.notification-body{
    padding: 10px 12px;
    align-items: center;
    display: flex;
    background: #FFFFFF;
    border: 1px solid #EDEFF2;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    margin-bottom: 8px;
    margin-right: 16px;
    width: 284px;
    height: 76px;
}
.notification-title{
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #0E0F12;
}
.notification-text{
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #6E7485;
}
.notification-body .col, .notification-body .col-auto{
    padding: 0;
}

.notification-body .col{
    padding-left: 12px;
}
</style>