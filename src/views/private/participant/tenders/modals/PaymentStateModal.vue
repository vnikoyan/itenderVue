<template>
    <modal
        class="payment-state-modal modal-without-footer"
        name="payment-state-modal"
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
                    @click="$modal.hide('payment-state-modal')" aria-label="Close">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
                </svg>
            </button>
        </div>
        <div id="modal-body">
            <div class="d-flex flex-column mx-5 my-5">
                <label for="payment_methods" class="font-weight-bold">Ընտրել վճարման եղանակ</label>
                <div class="mt-4">
                    <div class="d-flex align-items-center">
                        <input type="radio" id="bank_acc" name="payment" class="payment_radio cursor" value="1" v-model="checkedValue" @change="ischecked">
                        <label for="bank_acc" class="ml-2 mb-0 payment_label cursor">Բանկային փոխանցում</label>
                    </div>
                </div>
            </div>
            <div class="mx-5 my-5" :class="{'d-none' : showContent}">
                <div>
                    <p class="font-weight-bold color">Կազմակերպության անվանումը՝ « ԱՅ ՏԵՆԴԵՐ » ՍՊԸ</p>
                    <p class="font-weight-bold color">Հասցե՝ ք.Երևան, Ազատության 24, 313 սենյակ,</p>
                    <p class="font-weight-bold color">ՀՎՀՀ 05538076</p>
                    <p class="font-weight-bold color">Բանկ՝ «ԱԿԲԱ ԿՐԵԴԻՏ ԱԳՐԻԿՈԼ ԲԱՆԿ » ՓԲԸ</p>
                    <p class="font-weight-bold color">Հ/Հ 220453330569000</p>
                    <p class="font-weight-bold color">Նպատակը՝ www.itender.am կայքի ծառայությունների փաթեթի /օրինակ՝ Պրեմիում փաթեթ և ժամկետը/ հասանելիության համար :</p>
                </div>
                <button class="btn btn-primary" @click="SendData">Հաստատել</button>
            </div>
            <div class="mx-5 my-3">
                <button class="btn btn-primary" :class="{'d-none' : showButton}" @click="cardPayment">Վճարել</button>
            </div>
        </div>
    </modal>    
</template>
<script>
  export default{
    data(){
        return{
            checkedValue: 0,
            packageId: 0,
            showContent: true,
            showButton: true,
        }
    },
    methods:{
        beforeOpen({params}){
            this.packageId = params
            console.log(params)
        },
        ischecked(){
            if(this.checkedValue === "2"){
                this.showContent = true
                this.showButton = false
            }
            if(this.checkedValue === "1"){
                this.showContent = false
                this.showButton = true
            }
        },
        SendData(){
            var id = {
                package_id: this.packageId,
            }
            this.$client.post('creat/order/bank/transfer', id).then(({data}) => {
                if(data.error){
                    this.$fire({
                      text: "Խնդրում ենք կատարել վճարումը, և 1 օրվա ընթացքում փաթեթը կակտիվանա: Շնորհակալություն համակարգից օգտվելու համար:",
                      type: "warning",
                      confirmButtonText: 'Լավ'
                    }).then(() => {
                        this.$modal.hide('payment-state-modal')
                    })
                }
            })
        },
        beforeClose(){
            this.checkedValue = null
            this.showContent = true
            this.showButton = true
        },
        cardPayment(){
            const requestData ={
                package_id: this.packageId,
                method: 'arca'
            }
            this.$client.post('create/order/state/payment/url', requestData).then(({data}) => {
                const { formUrl } = data
                window.location.href = formUrl
            })
        }
    }
  }                
</script>

<style scoped>
  .payment_radio{
      width: 18px;
      height: 18px;
  }
  .payment_label{
      color: black;
      font-size: 15px;
  }
  .cursor{
      cursor: pointer;
  }
  .color{
      color: #656d9a;
  }
  .size{
      width: 50px;
      height: 50px;
  } 
  .size1{
      width: 65px;
      height: 65px;
  }
</style>
