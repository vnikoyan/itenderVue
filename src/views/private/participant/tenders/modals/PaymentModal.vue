<template>
    <modal
        class="payment-modal modal-without-footer"
        name="payment-modal"
        @closed="$emit('updateComparisonData')"
        @before-close="beforeClose"
        @before-open="beforeOpen"
        transition="fade"
        :adaptive="true"
        :scrollable="true"
        :reset="true"
        width="35%"
        height="60%"
    >
        <div id="modal-header" style="background-color:#006BE6">
            <div class="w-75 d-flex text-white">
                <p style="font-weight: 400;">Վճարման եղանակներ</p>
            </div>
            <button type="button"
                    class="close position-absolute"
                    style="right: 1.25rem; top: 25%"
                    @click="$modal.hide('payment-modal')" aria-label="Close">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
                </svg>
            </button>
        </div>
        <div id="modal-body">
            <p class="title-heading">Ընտրել վճարման եղանակ</p>
            <div class="d-flex align-items-center check-block-first">
                <input type="radio" id="bank_acc" name="payment" class="payment_radio cursor" value="1" v-model="checkedValue" @change="ischecked">
                <label for="bank_acc" class="mb-0 payment_label cursor">Բանկային փոխանցում</label>
            </div>

            <div v-if="!isState" class="d-flex align-items-center">
                <input type="radio" id="card" name="payment" class="payment_radio cursor" value="2" v-model="checkedValue" @change="ischecked"> 
                <label for="card" aria-expanded="false" class="mb-0 payment_label cursor d-flex align-items-center">
                    <div class="payment-logo">
                        <master/>
                    </div>
                    <div class="payment-logo">
                        <visa/>
                    </div>
                    <div class="payment-logo">
                        <arca/>
                    </div>
                    <div class="payment-logo">
                        <amex/>
                    </div>
                </label>
            </div>
            <div class="bank-info-block" :class="{'d-none' : showContent}">
                <div>
                    <p class="bank-info-label">Կազմակերպության անվանումը՝ <span class="bank-info-value">« ԱՅ ՏԵՆԴԵՐ » ՍՊԸ</span></p>
                    <p class="bank-info-label">Հասցե՝ <span class="bank-info-value">ք.Երևան, Ազատության 24, 313 սենյակ</span></p>
                    <p class="bank-info-label">ՀՎՀՀ՝ <span class="bank-info-value bank-info-label-small">05538076</span></p>
                    <p class="bank-info-label">Բանկ՝ <span class="bank-info-value">«ԱԿԲԱ ԿՐԵԴԻՏ ԱԳՐԻԿՈԼ ԲԱՆԿ » ՓԲԸ</span></p>
                    <p class="bank-info-label">Հ/Հ՝ <span class="bank-info-value bank-info-label-small">220453330569000</span></p>
                    <p class="bank-info-label bank-info-label-last">Նպատակը՝ <span class="bank-info-value">www.itender.am կայքի ծառայությունների փաթեթի /օրինակ՝ Պրեմիում փաթեթ և ժամկետը/ հասանելիության համար:</span></p>
                </div>
            </div>
        </div>
        <div id="modal-footer" class="text-center">
            <button :disabled="!checkedValue" class="btn btn-primary br-8" @click="confirmPayment">
                <span>Հաստատել</span>
            </button>
        </div>
    </modal>    
</template>
<script>
    import master from '@/components/logos/master';
    import arca from '@/components/logos/arca';
    import visa from '@/components/logos/visa';
    import amex from '@/components/logos/amex';
    export default{
        data(){
            return{
                checkedValue: 0,
                selectedMonth: 0,
                selectedPackage: 0,
                showContent: true,
                isState: false,
            }
        },
        computed:{
            userType(){
                return this.$store.getters.userType
            },
        },
        components: {master, arca, visa, amex},
        methods:{
            beforeOpen({params}){
                if(this.userType === 'STATE'){
                    this.isState = true;
                    this.checkedValue = 1;
                    this.showContent = false
                }
                this.selectedPackage = params.selectedPackage
                this.selectedMonth = params.selectedMonth
            },
            ischecked(){
                if(this.checkedValue === "2"){
                    this.showContent = true
                }
                if(this.checkedValue === "1"){
                    this.showContent = false
                }
            },
            confirmPayment(){
                if(+this.checkedValue === 1){
                    this.sendData()
                } else {
                    this.cardPayment()
                }
            },
            sendData(){
                var idandmonth = {
                    package_id: this.selectedPackage.id,
                    month:  this.selectedMonth.month,
                }
                this.$client.post('creat/order/bank/transfer', idandmonth).then(({data}) => {
                    if(data.error){
                        this.$fire({
                        text: "Խնդրում ենք կատարել վճարումը, և 1 օրվա ընթացքում փաթեթը կակտիվանա: Շնորհակալություն համակարգից օգտվելու համար:",
                        type: "warning",
                        confirmButtonText: 'Լավ'
                        }).then(() => {
                            this.$modal.hide('payment-modal')
                        })
                    }
                })
            },
            beforeClose(){
                this.checkedValue = null
                this.showContent = true
            },
            cardPayment(){
                const requestData ={
                    package_id: this.selectedPackage.id,
                    month:  this.selectedMonth.month,
                    method: 'arca'
                }
                this.$client.post('create/order/payment/url', requestData).then(({data}) => {
                    const { formUrl } = data
                    window.location.href = formUrl
                })
            }
        }
    }
</script>

<style scoped>
    .title-heading{
        margin-bottom: 24px;
    }
    .payment-modal .vm--modal #modal-body{
        height: calc(100% - 56px - 80px);
        padding: 20px 30px;
    }
    .payment-modal .vm--modal #modal-body label{
        margin-left: 12px;
    }
    .check-block-first{
        margin-bottom: 24px;
    }
    .payment-logo{
        margin-right: 20px;
    }
    .payment_radio{
        width: 18px;
        height: 18px;
    }
    .bank-info-label-last{
        display: flex;
    }
    .bank-info-block{
        margin-top: 36px;
    }
    .payment_label{
        color: black;
        font-size: 15px;
    }
    .cursor{
        cursor: pointer;
    }
    .bank-info-label{
        font-size: 14px;
        line-height: 20px;
        color: #6E7485;
        margin-bottom: 8px;
    }
    .bank-info-value{
        font-weight: 550;
        font-size: 14px;
        line-height: 20px;
        color: #2D3036;
        margin-left: 8px;
    }
    .size{
        width: 50px;
        height: 50px;
    } 
    .size1{
        width: 65px;
        height: 65px;
    }

    
    @media (max-width: 768px) {
        .payment-logo{
            margin-right: 5px;
        }
        .payment_label{
            margin-left: 6px !important;
        }
        .bank-info-value:not(.bank-info-label-small){
            display: block;
            margin-left: 0px;
        }
        .payment-modal .vm--modal #modal-body{
            height: calc(100% - 56px - 80px);
            padding: 10px 15px;
        }
        .bank-info-label-last{
            display: block;
        }
    }

</style>
