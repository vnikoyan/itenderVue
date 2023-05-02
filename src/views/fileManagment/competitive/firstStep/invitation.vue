<template>
  <div id="invitation" ref="contract"
       class="w-100"
       contentEditable="false"
       v-html="invitation"></div>
</template>

<script>
  import $ from 'jquery'
  import purchaseTypes from '@/mixins/purchaseTypes'
  import cpvTypes from '@/mixins/cpvTypes'
  import download from '@/mixins/download'
  export default {
    name: 'InvitationFile',
    mixins: [purchaseTypes, cpvTypes, download],
    props: {
      lng: String,
      loadingEnd: Function,
      loadingStart: Function
    },
    data() {
      return {
        contractTypes: {
          1: 'ապրանքների մատակարարման',
          2: 'ծառայությունների մատուցման',
          3: 'աշխատանքների կատարման',
        },
        invitation: '',
        contract: '',
        organizedAllData: {}, // todo get by vuex
        tdOpen: `<td style="border-left:solid #000000 0.9960975000000001pt;border-right:solid #000000 0.9960975000000001pt;border-bottom:solid #000000 0.9960975000000001pt;border-top:solid #000000 0.9960975000000001pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                <p dir="ltr"
                   style="line-height:1.2;margin-left: 5pt;margin-right: 7pt;text-align: center;margin-top:0pt;margin-bottom:0pt;">
                    <span
                        style="font-size:10pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">`,
        tdClose: `</span>
                </p>
            </td>`
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      },
      me() {
        return this.$store.getters['user/me']
      },
      downloadedFileName() {
        let fileName = ''
        switch (this.lng) {
         case 'hy':
           fileName = 'Հրավեր (հայերեն)'
           break
         case 'ru':
           fileName = 'Հրավեր (ռուսերեն)'
           break
        }
        return fileName
      }
    },
    
    mounted() {
      this.getInvitationRequest().then(async (response) => {
        this.invitation = response.data + this.currentOrganized[`contract_html_${this.lng}`]
        this.organizedAllData = await this.$store.dispatch('organize/getAllData', this.currentOrganized.id)
        this.$nextTick(() => {
          this.modifyInvitationAccordingToProcurement()
        })
        this.getContract()
      })
    },
    methods: {
      // save() {
      //   // console.log(JSON.stringify($('#file').html()), 'json')
      //   const parser = new DOMParser();
      //   const doc = parser.parseFromString($('#invitation').html(), 'text/html');
      //   console.log(typeof doc.body, 'dom')
      // },
      async download(){
        const copyCountInput = $('#copy-count')
        const exchangeRateInput = $('#exchange-rate')
        await this.$client.put(`organize/${this.currentOrganized.id}`, {get_invitation: true}).then(({ status, data }) => {
          // eslint-disable-next-line eqeqeq
          if(status == 200) {
            this.$store.commit('organize/setCurrentOrganized', data.data)
          }
        }).catch(e => {
          console.log(e)
        })
        if(this.organizedAllData.organize_type === 0 && !exchangeRateInput.val()) {
          this.loadingEnd()
          exchangeRateInput.focus()
          exchangeRateInput.css({"border-bottom": "2px solid rgb(255, 0, 0)"})
        } else {
          if(this.organizedAllData.organize_type === 0 && !copyCountInput.val()) {
            this.loadingEnd()
            copyCountInput.focus()
            copyCountInput.css({"border-bottom": "2px solid rgb(255, 0, 0)"})
          } else{
            await $("#invitation *").each(function(){
              if($(this).css("display") === "none"){
                $(this).remove()
              }
            });
            $('.editor-input').each(function() {
              const txt = $(this).val()
              $(this).after(txt)
              $(this).remove()
            });
            this.sendToPDFGeneration(this, document.getElementById('invitation').innerHTML, this.downloadedFileName, this.handleLoadingEnd)
          }
        }
      },
      handleLoadingEnd(){
        this.loadingEnd()
        this.$modal.hide('editor-modal')
      },
      getInvitationRequest() {
        // todo get invitation from api
        // this.$client.get('invitation/{userId}').then(response => {
        //   this.invitation = response.data.data && response.data.data || require('@/assets/files/invitation_hy.html')
        // })
        return new Promise(resolve => { // faking request
          setTimeout(() => {
            resolve({data: require(`@/assets/files/invitation_${this.lng}.html`)})
          })
        })
      },
      getContract() {
        // this.$client.get('getContract/{userId}').then(response => {
        //   this.contract = response.data.data
        // })
      },
      modifyInvitationAccordingToProcurement() {
        const variablesColor = {color: '#1155cc'}
        const limit = 25000000
        const locale = this.lng
        const purchaseType = this.organizedRows[0].type
        const isElectronicMode = this.organizedAllData.organize_type === 1
        const isPaperMode = this.organizedAllData.organize_type === 0
        const isOrganizedByPortions = this.organizedAllData.organize_row_percents.length > 1
        const isUrgentPurchase = this.organizedAllData.organize_row_percents[0].procurement_plan.details[0].type === 3
        const isArticle15Point6 = this.organizedAllData.organize_row_percents[0].procurement_plan.is_condition && this.organizedAllData.organize_row_percents[0].procurement_plan.condition_type === 'first_p'
        const openingTime = this.$moment(this.organizedAllData.opening_time, "HH:mm:ss").format("HH:mm");
        const phasedPortions = this.organizedAllData.organize_row_percents.filter(row => {
          return row.phased_version
        })
        const prepaymentConsidered = this.organizedAllData.prepayment
        const portionSerialNumbersGreaterTenM = []
        const portionSerialNumbersLessOrEqualTenM = []
        this.organizedAllData.organize_row_percents.forEach(row => {
          const detailsId = (this.organizedAllData.organize_rows.find(item => item.id === row.id)).plan_details_id
          const details = row.procurement_plan.details.find(detail => detail.id === detailsId)
          if(details.unit_amount * row.count > limit) {
            portionSerialNumbersGreaterTenM.push(row.order_index || (portionSerialNumbersGreaterTenM.length + 1))
          } else {
            portionSerialNumbersLessOrEqualTenM.push(row.order_index || (portionSerialNumbersLessOrEqualTenM.length + 1))
          }
        })
        // is-rights-responsibilities-fulfillment
        if(!this.organizedAllData.rights_responsibilities_fulfillment) {
          $('.is-rights-responsibilities-fulfillment').hide()
        }
        // 'copy-count' input (setting event listener)
        $('#copy-count').on('input', function(e) {
          if($(this).css('border-bottom') === '2px solid rgb(255, 0, 0)') {
            $(this).css({'border-bottom': '2px solid rgb(80, 110, 228)'})
          }
          $(this).attr('value', e.target.value)
        })
        if(phasedPortions.length) {
          phasedPortions.length > 1 ? $('.phased-singular').hide() : $('.phased-plural').hide()
          $('.phased-portions').text(phasedPortions.map(portion => portion.row_index).join(', '))
        } else {
          $('.is-not-phased-version').hide()
        }
        // window.axios.get(`https://bezbukv.ru/inflect/${this.organizedAllData.evaluator_secretary_name[locale]}`).then(response => {
        //   const doc = new DOMParser().parseFromString(response.data, "text/xml")
        //   console.log(doc, 'doc')
        // })
        // links color and open in a new tab
        $('#invitation a > span').css({color: '#1155cc', textDecoration: 'underline'})
        $('a').attr('target', '_blank')
        // logic for 11.1 - 2) company types
        // eslint-disable-next-line no-undef
        if(_.includes(['ՓԲԸ', 'ՊՈԱԿ', 'ՀՈԱԿ'], this.me.organisation[0].translations.company_type.hy)) {
          $('.non-profit').css({display: 'inline'})
          // eslint-disable-next-line no-undef
        } else if(_.includes(['Համայնքապետարան', 'քաղաքապետարան'], this.me.organisation[0].translations.company_type.hy)) {
          $('.community').css({display: 'inline'})
        } else if(this.me.organisation[0].translations.company_type.hy === 'Հիմնադրամ') {
          $('.foundation').css({display: 'inline'})
        } else if(this.me.organisation[0].translations.company_type.hy) { // condition for state( need to be discussed)
          $('.state').css({display: 'inline'})
        }
        $('.purchase-types').text(this.purchaseTypesLongNames[locale][purchaseType || 2]).css(variablesColor)
        $('.purchase-types.cased').text(this.purchaseTypesLongNamesCased[locale][purchaseType || 2]).css(variablesColor)
        $('.purchase-types.cased-2').text(this.purchaseTypesLongNamesCased2[locale][purchaseType || 2]).css(variablesColor)
        $('.purchase-types.uppercase').text(this.purchaseTypesLongNames[locale][purchaseType || 2].toUpperCase()).css(variablesColor)
        $('.purchase-types.uppercase.cased').text(this.purchaseTypesLongNamesCased[locale][purchaseType || 2].toUpperCase()).css(variablesColor)
        $('.purchase-types.uppercase.cased-2').text(this.purchaseTypesLongNamesCased2[locale][purchaseType || 2].toUpperCase()).css(variablesColor)
        if(Number(this.currentOrganized.cpv_type) === 1){
          $('.is-construction').hide();
          $('.rearrange-construction-items').each(function() { $(this).text(Number($(this).text()) - 1) })
          $('.is-product').show()
          $('.is-not-product').hide() 
          $('.is-service').hide() 
          $('.is-not-service').show()
          $('.is-work').hide()
          $('.is-not-work').show()
          $('.colspan-variable').attr('colspan' , 5);
          
        }else if(Number(this.currentOrganized.cpv_type) === 2){
          $('.is-construction').hide();
          $('.rearrange-construction-items').each(function() { $(this).text(Number($(this).text()) - 1) })
          $('.is-product').hide()  
          $('.rearrange-product-items').each(function() { $(this).text(Number($(this).text()) - 1) })
          $('.is-not-service').hide()
          $('.is-service').show()
          $('.rearrange-service-items').each(function() { $(this).text(Number($(this).text()) - 1) })
          $('.is-work').hide()
          $('.is-not-work').show()
          $('.colspan-variable').attr('colspan' , 5);
        }else if(Number(this.currentOrganized.cpv_type) === 3){
          $('.is-product').hide()  
          $('.rearrange-product-items').each(function() { $(this).text(Number($(this).text()) - 1) })
          $('.is-service').hide() 
          $('.is-not-service').show()
          $('.is-not-work').hide() 
          $('.rearrange-work-items').each(function() { $(this).text(Number($(this).text()) - 1) }) 
          $('.is-work').show()
          if(this.currentOrganized.is_construction){
            $('.is-not-construction').hide()
            $('.is-construction').show()
            $('.construction-content').text('Ընդ որում շինարարական աշխատանքների գնման դեպքում պայմանագրում ներառվում են ընտրված մասնակցի կողմից հայտով ներկայացված սարքերը և սարքավորումները:')
          }else{
            $('.is-not-construction').show()
            $('.rearrange-construction-items').each(function() { $(this).text(Number($(this).text()) - 1) })
            $('.is-construction').hide()
            $('.construction-content').text('Ընդ որում պայմանագրում ներառվում է ընտրված մասնակցի կողմից հայտով ներկայացված ապրանքի ամբողջական նկարագիրը:')      
          }
          $('.colspan-variable').attr('colspan' , 6)
          this.currentOrganized.is_with_specification ? $('.is-not-with-specification').hide() && $('.is-with-specification').show() : $('.is-with-specification').hide() && $('.is-not-with-specification').show()
        }
        !this.currentOrganized.repair_services ? $('.repair_services').hide() : $('.repair_services').show();
        
        const less = [];
        const greater = [];
        const lessValue = [];
        const greaterValue = [];
        this.organizedRows.forEach(item => {
          if(item.count * item.procurementPlan.details[0].unit_amount < 25000000){
            lessValue.push(' ' + item.view_id)
          }else{
            greaterValue.push(' ' + item.view_id)
          } 
          if(item.count * item.procurementPlan.details[0].unit_amount < 70000000){
            less.push(' ' + item.view_id) 
          }else{
            greater.push(' ' + item.view_id)
          } 
        })
        if(lessValue.length === this.organizedRows.length){
          $('.text-first-variant').show()
          $('.text-second-variant').hide()
          $('.text-third-variant').hide()
        }else if(lessValue.length === 0){
          $('.text-second-variant').show()
          $('.text-first-variant').hide()
          $('.text-third-variant').hide()
        }else{
          $('.text-first-variant').hide()
          $('.text-second-variant').hide()
          $('.text-third-variant').show()
        }
        if(greaterValue.length === this.organizedRows.length){
          $('.all-greater-than').show()
        }else{
          $('.all-greater-than').hide()
        }
        if(less.length > 0){
          $('.less').text(less)
          if(less.length > 1){
            $('.less_lots').text('չափաբաժինների')
            $('.less_lots_ru').text('лотов')
          }else{
            $('.less_lots').text('չափաբաժնի')
            $('.less_lots_ru').text('лота')
          }
        }else{
          $('.less_lots_block').hide()
        }
        if(greater.length > 0){
          $('.greater').text(greater)
          if(greater.length > 1){
            $('.greater_lots').text('չափաբաժինների')
            $('.greater_lots_ru').text('лотов')
          }else{
            $('.greater_lots').text('չափաբաժնի')
            $('.greater_lots_ru').text('лота')
          }
        }else{
          $('.greater_lots_block').hide()
        }
        if(lessValue.length > 0){
          $('.lessValue').text(lessValue)
          if(lessValue.length > 1){
            $('.lessValue_lots').text('չափաբաժինների')
            $('.lessValue_lots_ru').text('лотов')
          }else{
            $('.lessValue_lots').text('չափաբաժնի')
            $('.lessValue_lots_ru').text('лота')
          }
        }else{
          $('.lessValue_lots_block').hide()
        }
        if(greaterValue.length > 0){
          $('.greaterValue').text(greaterValue)
          if(greaterValue.length > 1){
            $('.greaterValue_lots').text('չափաբաժինների')
            $('.greaterValue_lots_ru').text('лотов')
          }else{
            $('.greaterValue_lots').text('չափաբաժնի')
            $('.greaterValue_lots_ru').text('лота')
          }
        }else{
          $('.greaterValue_lots_block').hide()
        }
        const cpvTypesUppercase = this.cpvTypes[locale][Number(this.currentOrganized.cpv_type)] + (locale === 'hy' ? 'ների' : '')
        if(this.organizedAllData.organize_row_percents[0].procurement_plan.cpv){
          $('.cpv-types').text(cpvTypesUppercase) 
          $('.cpv-types.uppercase').text(cpvTypesUppercase.toUpperCase())
        }else{
          $('.cpv-types').text(cpvTypesUppercase)
          $('.cpv-types.uppercase').text(cpvTypesUppercase.toUpperCase())
        }
        if(Number(this.currentOrganized.cpv_type) === 1){
          $('.changeContent10').text('առաջարկվող ապրանքի ամբողջական')
          $('.changeContent11').text('ապրանքի')
          
          $('.cpvTypeText').text('ապրանք')
          $('.cpvTypeText1').text('Ապրանքի')
          $('.cpvTypeText2').text('ապրանքի')
          $('.cpvTypeText_2').text('ապրանքի')
          $('.cpvTypeText3').text('Ապրանքների')
          $('.cpvTypeText4').text('մատակարարման')
          $('.changeText').text('товара')
          $('.changeText1').text('товаров')
          $('.changeText2').text('поставки товара')
          $('.changeText3').text('поставки товаров')
          $('.changeText4').text('товары')
          $('.changeText4uppercase').text('ТОВАРЫ')
          $('.changeText5').text('товар')
          $('.changeText6').text('товара')
          $('.changeText7').text('поставку товаров')
          $('.changeWorkContent').text('գործակալության')
          $('.changeWorkContent1').text('Գործակալության')
          $('.changeWorkContent2').text(' ապրանքների')
          $('.appendix_1_1_content').text('предлагаемого товара')
          $('.appendix_1_1_content1').text('полное описание предлагаемого им')
          $('.appendix_1_1_content2').text('товара')
          $('.appendix_1_1_content3').text('Предлагаемый товар')
          $('.appendix_1_1_table').attr('colspan' , 5)
          $('.changeText8').text('агентского договора')
          $('.changeText9').text('агентство')
        }else if(Number(this.currentOrganized.cpv_type) === 2){
          $('.cpvTypeText').text('ծառայություն')
          $('.cpvTypeText1').text('Ծառայության')
          $('.cpvTypeText2').text('ծառայության')
          $('.cpvTypeText_2').text('ծառայության')
          $('.cpvTypeText3').text('Ծառայությունների')
          $('.cpvTypeText4').text('մատուցման')
          $('.changeText').text('услуг')
          $('.changeText1').text('услуг')
          $('.changeText2').text('предоставления услуг')
          $('.changeText3').text('оказния услуг')
          $('.changeText4').text('услуги')
          $('.changeText4uppercase').text('УСЛУГИ')
          $('.changeText5').text('услуга')
          $('.changeText6').text('услуги')
          $('.changeText7').text('предоставлению услуг')
          $('.changeWorkContent').text('գործակալության')
          $('.changeWorkContent1').text('Գործակալության')
          $('.appendix_1_1_table').attr('colspan' , 5)
          $('.changeText8').text('агентского договора')
          $('.changeText9').text('агентство')
        }else if(Number(this.currentOrganized.cpv_type) === 3){
          $('.changeContent10').text('առաջարկվող սարքերի և սարքավորումների')
          $('.changeContent11').text('սարքերի և սարքավորումների')
          $('.cpvTypeText').text('աշխատանք')
          $('.cpvTypeText1').text('Աշխատանքի')
          $('.cpvTypeText2').text('սարքերի և սարքավորումների տեխնիկական բնութագրերի')
          $('.cpvTypeText3').text('Շինարարական ծրագրերի')
          $('.changeText').text('работ')
          $('.changeText1').text('работ')
          $('.changeText2').text('выполнения работ')
          $('.changeText3').text('выполнение работ')
          $('.changeText4').text('работы')
          $('.changeText4uppercase').text('РАБОТА')
          $('.changeText5').text('работа')
          $('.changeText6').text('работы')
          $('.changeText7').text('выполнение работ')
          $('.cpvTypeText_2').text('աշխատանքի')
          $('.changeWorkContent2').text('սարքերի և սարքավորումների')
          $('.appendix_1_1_content').text('приборов и оборудования')
          $('.appendix_1_1_content1').text('описания предлагаемых им')
          $('.appendix_1_1_content2').text('приборов и оборудования')
          $('.appendix_1_1_content3').text('Предлагаемые приборы и оборудование')
          if(this.currentOrganized.is_construction){
            $('.changeWorkContent').text('ենթակապալի')
            $('.changeWorkContent1').text('Ենթակապալի')
            $('.appendix_1_1_table').attr('colspan' , 6)
            $('.changeText8').text('договора субподряда')
            $('.changeText9').text('субподряд')
          }else{
            $('.changeWorkContent').text('գործակալության')
            $('.changeWorkContent1').text('Գործակալության')
            $('.changeText8').text('агентского договора')
            $('.changeText9').text('агентство')
          }   
        }
        
        $('.company-name').text(this.me.organisation[0].translations.name[locale]).css(variablesColor)
        $('.company-type').text(this.me.organisation[0].translations.company_type[locale]).css(variablesColor)
        if(this.me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || this.me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || this.me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || this.me.organisation[0].translations.company_type.hy === 'Ա/Կ' || this.me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || this.me.organisation[0].translations.company_type.hy === 'Հ/Կ' || this.me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || this.me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'){
          $('.ending-word').text('-ն')
        }else{ 
          $('.ending-word').text('ն')
        }
        if(locale === 'ru'){
          $('.company-address').text(this.me.organisation[0].translations.city[locale] !== this.me.organisation[0].translations.region[locale] ? 'РА,' + ' ' + 'г.' + ' ' + this.me.organisation[0].translations.city[locale] + ', ' + this.me.organisation[0].translations.region[locale] + ', ' + this.me.organisation[0].translations.address[locale] : 'РА,' + ' ' + 'г.' + ' ' + this.me.organisation[0].translations.city[locale] + ', ' + this.me.organisation[0].translations.address[locale]).css(variablesColor)
        }else{
          $('.company-address').text(this.me.organisation[0].translations.city[locale] !== this.me.organisation[0].translations.region[locale] ? 'ՀՀ,' + ' ' + '' + ' ' + this.me.organisation[0].translations.city[locale] + ', ' + this.me.organisation[0].translations.region[locale] + ', ' + this.me.organisation[0].translations.address[locale] : 'ՀՀ,' + ' ' + '' + ' ' + this.me.organisation[0].translations.city[locale] + ', ' + this.me.organisation[0].translations.address[locale]).css(variablesColor)
        }
        $('.procurement-code').text(this.organizedAllData.code[locale]).css(variablesColor)
        $('.contract-type').text(this.contractTypes[Number(this.currentOrganized.cpv_type)]).css(variablesColor)
        $('.submission-date').text(this.organizedAllData.submission_date || 2).css(variablesColor)
        $('.opening-time').text(` ${openingTime}`).css(variablesColor)
        $('#exchange-rate').val('հայտերի բացման դրությամբ ՀՀ կենտրոնական բանկի կողմից սահմանված')
        // $('.exchange-rate').text(this.organizedAllData.exchange_rate)
        // submission date calculated
        const date = new Date(this.organizedAllData.opening_date)
        const year = date.getFullYear()
        let month = date.getMonth()
        month++
        let day = date.getDate()
        if(day < 10) day = '0' + day
        if(month < 10) month = '0' + month
        $('.opening-date').text(`${day}/${month}/${year}`).css(variablesColor)
        // $('.calc-submission-date').text(new Date(this.organizedAllData.public_date))
        const approvalDateComponents = this.organizedAllData.text_approval_date.split('-')
        $('.approval-year').text(approvalDateComponents[0]).css(variablesColor)
        $('.approval-month-day').text(`${approvalDateComponents[1]}/${approvalDateComponents[2]} `).css(variablesColor)
        $('.decision-number').text(this.organizedAllData.decision_number).css(variablesColor)
        $('.fee').text(this.organizedAllData.fee).css(variablesColor)
        $('.account-number').text(this.organizedAllData.account_number).css(variablesColor)
        if(Number(this.organizedAllData.paper_fee) === 1){
          $('.is-not-paper-fee').hide()
          $('.is-paper-fee').show()
        }else{
          $('.is-not-paper-fee').show()
          $('.is-paper-fee').hide()
        }
        $('.evaluator-secretary-name').text(this.organizedAllData.evaluator_secretary_name[locale] ).css(variablesColor)
        $('.evaluator-secretary-phone').text(this.organizedAllData.evaluator_secretary_phone).css(variablesColor)
        $('.evaluator-secretary-email').text(this.organizedAllData.evaluator_secretary_email).css(variablesColor)
        isUrgentPurchase ? $('.is-not-urgent-purchase').hide() && $('.is-urgent-purchase').show() : $('.is-urgent-purchase').hide() && $('.is-not-urgent-purchase').show()
        if(this.organizedAllData.organize_row_percents.length === 1) {
          $('.more-than-one-portion').hide()
        }
        $('.portion-count').text(this.organizedAllData.organize_row_percents.length)
        this.fillPortionTable()
        this.fillPortionTableRu()
        prepaymentConsidered ? this.fillPrepaymentTable() : $('.prepayment-table').hide()
        if(this.organizedAllData.prepayment === 0){
          $('.is-prepayment').hide()
        }else{
           $('.is-prepayment').show()
        }
        // logic for part 1 article 7
        const noApplicationProvisionNeeded = portionSerialNumbersGreaterTenM.length === 0 || isUrgentPurchase || isArticle15Point6
        if(noApplicationProvisionNeeded) {
          $('.is-collateral-requirement').hide()
          $('.rearrange').each(function() { $(this).text(Number($(this).text()) - 1) })
        } else {
          $('.portion-serial-numbers').text(portionSerialNumbersGreaterTenM.join(', '))
          portionSerialNumbersGreaterTenM.length > 1 ?
            $('.portion-singular').hide() :
            $('.portion-plural').hide()
        }
        // logic for part 1 article 10 / ՈՐԱԿԱՎՈՐՄԱՆ ԵՎ ՊԱՅՄԱՆԱԳՐԻ ԱՊԱՀՈՎՈՒՄՆԵՐԸ
        if(prepaymentConsidered) {
          $('.new-condition').show()
        } else {
          if(!isArticle15Point6 && portionSerialNumbersGreaterTenM.length > 0) {
            $('.new-condition').show()
          } else {
            $('.new-condition').hide()
          }
        }
        this.currentOrganized.is_with_condition ? $('.is-with-condition').show() : $('.is-with-condition').hide()
        $('.company-tin').text(this.me.organisation[0].tin || '').css(variablesColor)
        $('.company-serving-bank').text(this.me.organisation[0].translations.bank_name[locale] || '').css(variablesColor)
        $('.company-account-number').text(this.me.organisation[0].bank_account || '').css(variablesColor)
        // logic for portions greater 10M or (equall or less than 10M)
        if(portionSerialNumbersGreaterTenM.length) {
          $('.portions-greater-10M > .portion-serial-numbers').text(portionSerialNumbersGreaterTenM.join(', '))
          // portionSerialNumbersGreaterTenM.length === 1 ?
          //   $('.portion-plural').hide() :
          //   $('.portion-singular').hide()
        } else {
          $('.portions-greater-10M').hide()
        }
        if(portionSerialNumbersLessOrEqualTenM.length) {
          $('.portions-less-or-equal-10M > .portion-serial-numbers').text(portionSerialNumbersLessOrEqualTenM.join(', '))
          // portionSerialNumbersLessOrEqualTenM.length === 1 ?
          //   $('.portion-plural').hide() :
          //   $('.portion-singular').hide()
        } else {
          $('.portions-less-or-equal-10M').hide()
        }
        if(isPaperMode) {
          this.rearrangeArticleNumbers($('.rearrange-if-removed-8-3'))
          this.rearrangeArticleNumbers($('.rearrange-if-removed-8-23'))
          this.rearrangeArticleNumbers($('.rearrange-if-removed-9-4'))
          this.rearrangeArticleNumbers($('.rearrange-if-removed-9-6'))
        }
        // eslint-disable-next-line no-undef
        // $('.period-of-inactivity').text(_.includes([4,5,7], purchaseType) ?  10 : 5)
        $('.period-of-inactivity').text(10)
        if(!isOrganizedByPortions) {
          $('.is-by-portions').hide()
          this.rearrangeArticleNumbers($('.rearrange-if-removed-8-19'))
          // if(locale === 'ru') { // todo need to be discussed (in russian version sub articles count less than in armenian version)
          //   this.rearrangeArticleNumbers($('.rearrange-if-removed-8-18'))
          // }
        }
        // logic for article 3.6 (2nd sentence)
        if(purchaseType === 3
          // eslint-disable-next-line no-undef
          || (_.includes([4,5,7], purchaseType) && isArticle15Point6 && portionSerialNumbersGreaterTenM.length === 0)
          || portionSerialNumbersGreaterTenM.length === 0) {
          $('.article-3_6-2nd_sentence').hide()
        }
        if(!this.organizedAllData.sdr_limit) {
          $('.sdr-limit').hide()
        }
        if(!isArticle15Point6) {
          $('.article-15_6').hide()
        }
        if(this.organizedAllData.organize_row_percents[0].is_product_info) {
          this.organizedAllData.organize_type ? $('.is-paper').hide() : $('.is-electronic').hide()
        }
        // this.organizedAllData.organize_row_percents[0].is_product_info ? $('.is-not-product-info').hide() && $('.is-product-info').show() : $('.is-product-info').hide() && $('.is-not-product-info').show()
        // this.organizedAllData.organize_row_percents[0].is_product_info ? $('.is-not-product-info').hide() && $('.is-product-info').show() : $('.is-product-info').hide() && $('.is-not-product-info').show()
        if(this.organizedAllData.organize_row_percents[0].is_product_info){
          $('.is-not-product-info').hide()
          $('.is-product-info').show()
        } else {
          $('.is-product-info').hide()
          $('.is-not-product-info').show()
          $('.appendix-1-2').html('Հավելված N 1.1')
        }
        isElectronicMode ? $('.paper-mode').hide() : $('.electronic-mode').hide()
      },
      rearrangeArticleNumbers(elm) {
        elm.each(function() { $(this).text(Number($(this).text()) - 1) })
      },
      getOrganizedProcurementAllData() {
        return this.$client.get(`organize/getAllData/${this.currentOrganized.id}`).then(response => {
          response.data.organize_row = response.data.organize_row.map(organizedRow => {
            return Object.assign(organizedRow, { // fake data
              order_index: organizedRow.id,
              cpv_code: 13430001,
              cpv_drop: 1,
              cpv_name: 'ավազ, շինարարական',
              percents: Array.from({ length: 12}, (_, i) => i < 10 ? (1 + i)*10 : 100)
            })
          })
          return response.data
        })
      },
      fillPortionTable() {
        this.organizedAllData.organize_row_percents.forEach((row, index) => {
          const cpvObj = row.procurement_plan.cpv_outside ? row.procurement_plan.cpv_outside : row.procurement_plan.cpv
          $('.portion-table').append(`
          <tr>
            ${this.tdOpen} ${row.view_id || index + 1 } ${this.tdClose} 
            ${this.tdOpen} ${row.procurement_plan.details[0].count * row.procurement_plan.details[0].unit_amount} ${this.tdClose}
            ${this.tdOpen} ${cpvObj.name} ${this.tdClose}
          </tr>`)
        })
      },
      fillPortionTableRu() {
        this.organizedAllData.organize_row_percents.forEach((row, index) => {
          const cpvObj = row.procurement_plan.cpv_outside ? row.procurement_plan.cpv_outside : row.procurement_plan.cpv
          $('.portion-table-ru').append(`
          <tr>
            ${this.tdOpen} ${row.view_id || index + 1 } ${this.tdClose} 
            ${this.tdOpen} ${row.procurement_plan.details[0].count * row.procurement_plan.details[0].unit_amount} ${this.tdClose}
            ${this.tdOpen} ${cpvObj.code}${row.procurement_plan.cpv_drop ? row.procurement_plan.cpv_drop + ' / ' : ''}${row.procurement_plan.cpv_drop ? row.procurement_plan.cpv_drop  : ''} ${this.tdClose}
            ${this.tdOpen} ${cpvObj.name_ru} ${this.tdClose}
          </tr>`)
        })
      },
      fillPrepaymentTable() {
        const dateParts = this.organizedAllData.prepayment_time.split('-')
        $('.prepayment-table').append(`<tr>${this.tdOpen}${this.organizedAllData.prepayment_max}${this.tdClose}${this.tdOpen}${dateParts[1]}/${dateParts[0]}${this.tdClose}</tr>`)
      }
    }
  }
</script>

<style scoped>
  /deep/p {
    line-height: 1.8 !important;
  }
  /deep/table {
    /*background: cyan;*/
    table-layout:fixed;
    width: 100%;
  }
  /deep/table td {
    white-space: normal;
    word-wrap: break-word;
  }
  /deep/.editor-input {
    text-align:center;
    border: none;
    border-bottom: 2px solid rgb(80, 110, 228);
    width: 60px;
    height: 20px;
    outline: none;
  }
</style>