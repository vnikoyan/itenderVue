<template>
  <div id="file" ref="contract"
       class="w-100"
       contentEditable="true"
       v-html="contract"></div>
</template>

<script>
  import $ from 'jquery'
  import purchaseTypes from '@/mixins/purchaseTypes'
  export default {
    name: 'FileEditor',
    mixins: [purchaseTypes],
    props: {
      lng: String
    },
    data() {
      return {
        contract: '',
        organizedAllData: {}, // todo get by vuex
        tdOpen: `<td style="border-left:solid #000000 0.9960975000000001pt;border-right:solid #000000 0.9960975000000001pt;border-bottom:solid #000000 0.9960975000000001pt;border-top:solid #000000 0.9960975000000001pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.2;margin-left: 5pt;margin-right: 7pt;text-align: center;margin-top:0pt;margin-bottom:0pt;">
                        <span style="font-size:10pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">`,
        tdClose:        `</span>
                    </p>
                 </td>`
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      me() {
        return this.$store.getters['user/me']
      }
    },
    mounted() {
      this.getContract().then(async () => {
        // eslint-disable-next-line no-undef
        console.log(this.getCpvTypeName(this.$route.query.cpvType))
        if(_.isEmpty(this.contract)) {
          this.contract = require(`@/assets/files/contract_${this.lng}_${this.getCpvTypeName(this.$route.query.cpvType)}.html`)
          this.organizedAllData = await this.$store.dispatch('organize/getAllData', this.currentOrganized.id)
          this.$nextTick(() => {
            this.modifyContractAccordingToProcurement()
          })
        }
        this.setInputs()
      })
    },
    methods: {
      getCpvTypeName(type){
        switch (+type) {
          case 1:
            return 'product'
          case 2:
            return 'service' 
          case 3:
            return 'work' 
          default:
        }
      },
      save() {
        // const file = $('#file')
        let isAllInputsFilled = true
        const inputs = $('.editor-input')
        inputs.each(function() {
          if(!$(this).val()) {
            isAllInputsFilled = false
            $(this).css({"border-bottom": "2px solid rgb(255, 0, 0)"})
            $(this).focus()
            // console.log(offsetTop, 'calc offset')
            // if(offsetTop !== 0) {
            //   file.animate({ scrollTop: offsetTop}, 1000)
            // } else {
            // }
            return false
          }
        })
        if(isAllInputsFilled) {
          $('.editor-input').each(function() {
              const txt = $(this).val()
              $(this).after(`${txt} `)
              $(this).remove()
          });
          const req = {}
          req[`contract_html_${this.lng}`] = $('#file').html()
          this.$client.put(`organize/${this.currentOrganized.id}`, req).then(({ status, data }) => {
            // eslint-disable-next-line eqeqeq
            if(status == 200) {
              this.$store.commit('organize/setCurrentOrganized', data.data)
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ թարմացված է'
              })
            }
            this.isSaving = false
          }).catch(e => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
            this.isSaving = false
            console.log(e, 'eeee')
          })
        }

        // console.log($('#file').html())
      },
      getContract() {
        return new Promise(resolve => {
          resolve(true)
        })
        // return this.$client.get(`organize/getContract/${this.currentOrganized.id}`).then(response => {
        //   this.contract = response.data.data
        // })
      },
      modifyContractAccordingToProcurement() {
        const limit = 10000000
        const isElectronicMode = this.organizedAllData.organize_type === 1
        const isWithPrepayment = this.organizedAllData.prepayment === 1
        const isArticle15Point6 = this.organizedAllData.organize_row_percents[0].procurement_plan.is_condition
        const isProductInfo = this.organizedAllData.organize_row_percents.some(row => row.is_product_info)
        const purchaseType = this.organizedAllData.organize_row_percents[0].procurement_plan.type
        const procurementTotalPrice = this.organizedAllData.organize_row_percents.reduce((sum, row) => {
          return sum + (row.procurement_plan.unit_amount * row.count)
        }, 0)

        $('#contract-procurement-code').text(this.organizedAllData.code[this.lng]).css({color: '#1155cc'})
        $('#contract-purchase-type').text(this.purchaseTypesLongNamesCased[this.lng][purchaseType || 2]).css({color: '#1155cc'})

        if(procurementTotalPrice < limit) {
          $('.total-price-limit')
        }

        if(!isWithPrepayment) {
          $('.is-with-deposit').hide()
        } else {
          $(".deposit-price").html(this.organizedAllData.prepayment_max)
        }

        if(!isProductInfo) {
          $('.is-product-info').hide()
        }

        if(!this.organizedAllData.rights_responsibilities_fulfillment) {
          $('.is-rights-responsibilities-fulfillment').hide()
        }

        isElectronicMode ?
          $('.contract-paper-mode').remove() :
          $('.contract-electronic-mode').remove()

        isArticle15Point6 && procurementTotalPrice < limit ?
          $('.is-not-article-15-point-6').hide() :
          $('.is-article-15-point-6').hide()

        // need to be discussed
        // $('.is-main-tool')

        this.fillSpecificationsTable()
        this.fillPaymentScheduleTable()
      },
      setInputs() {
        $(".editor-input").keydown(function () {
          // Save old value.
          if (!$(this).val() || (parseInt($(this).val()) <= 365 && parseInt($(this).val()) >= 0))
          $(this).data("old", $(this).val());
        });
        $(".editor-input").keyup(function () {
          // Check correct, else revert back to old value.
          if (!$(this).val() || (parseInt($(this).val()) <= 365 && parseInt($(this).val()) >= 0))
            ;
          else
            $(this).val($(this).data("old"));
        });
        $('.editor-input').on('input', function(e) {
          if($(this).css('border-bottom') === '2px solid rgb(255, 0, 0)') {
            $(this).css({'border-bottom': '2px solid rgb(80, 110, 228)'})
          }
          $(this).attr('value', e.target.value)
        })
      },
      fillSpecificationsTable() {
        const specTable = $('#specifications-table')
        this.organizedAllData.organize_row_percents.forEach((organizeRow, index) => {
          let shippingAddress = `${this.me.organisation[0].translations.region.hy}, ${this.me.organisation[0].translations.city.hy}, ${this.me.organisation[0].translations.address.hy}`;
          if(organizeRow.shipping_address.ru){
            shippingAddress = organizeRow.shipping_address[this.locale]
          }

          console.log(organizeRow)

          let columns = ''

          // order matters
          columns +=  this.tdOpen + (index + 1) + this.tdClose
          columns +=  this.tdOpen + organizeRow.procurement_plan.cpv.code + `${organizeRow.procurement_plan.cpv_drop && ' / '}` + organizeRow.procurement_plan.cpv_drop + this.tdClose
          columns +=  this.tdOpen + organizeRow.procurement_plan.cpv.name + this.tdClose
          columns +=  this.tdOpen + '' + this.tdClose // trademark, brand name and manufacturer (not filled in this phase)
          columns +=  this.tdOpen + organizeRow.procurement_plan.specifications.description.ru + this.tdClose // specification (to be discussed)
          columns +=  this.tdOpen + organizeRow.procurement_plan.unit + this.tdClose
          columns +=  this.tdOpen + organizeRow.procurement_plan.details[0].unit_amount + this.tdClose
          columns +=  this.tdOpen + (organizeRow.count * organizeRow.procurement_plan.details[0].unit_amount) + this.tdClose
          columns +=  this.tdOpen + organizeRow.count + this.tdClose
          columns +=  this.tdOpen + shippingAddress + this.tdClose
          columns +=  this.tdOpen + (organizeRow.supply || '') + this.tdClose
          columns +=  this.tdOpen + (organizeRow.supply_date || '') + this.tdClose

          specTable.append('<tr>' + columns + '</tr>')
        })
      },
      fillPaymentScheduleTable() {
        const paymentScheduleTable = $('#payment-schedule-table')

        this.currentOrganized.organize_rows.forEach((organizeRow, index) => {
          /*
            creating array of month names (month_1, month_2, ...)
            in response percent object contains additional fields
            so this names are created to pick only months from percent obj
            (if you want to write cleaner code ask backend developer to change response structure)
          */
          const monthNames = Array.from({ length: 12 }, (_, i) => `month_${i + 1}`)

          // to use reduce function on percents converting object to array (as percents in response is not an array but object)
          // eslint-disable-next-line no-undef
          const percents = Object.values(_.pick(organizeRow.organize_row_percent, monthNames))
          console.log(organizeRow)
          let columns = ''
          columns += this.tdOpen + (index + 1) + this.tdClose
          columns += this.tdOpen + `${organizeRow.procurement_plan.cpv.code}${organizeRow.procurement_plan.cpv_drop && ' / '}${organizeRow.procurement_plan.cpv_drop}` + this.tdClose
          columns += this.tdOpen + organizeRow.procurement_plan.cpv.name + this.tdClose
          columns += percents.reduce((acc, percent) => {
            if(percent){
              return acc + `${this.tdOpen}${percent}%${this.tdClose}`
            } else{
              return acc + `${this.tdOpen}${this.tdClose}`
            }
          }, '')
          columns +=  this.tdOpen + '100%' + this.tdClose
          paymentScheduleTable.append('<tr>' + columns + '</tr>')
        })
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
    width: 50px;
    height: 20px;
    outline: none;
  }
  /*td{
    border: 2px solid #666;
  }*/
</style>
