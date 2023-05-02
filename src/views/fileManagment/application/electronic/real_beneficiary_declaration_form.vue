<template>
  <div>
        <div style="padding: 30px;" >
            <div>
                <p style="font-size: 14px; text-align: right; margin-bottom: 2px; font-weight: 700;">Հավելված 1.2**</p>
                <p style="font-size: 14px; text-align: right; margin-bottom: 2px; font-weight: 700;"><span style=" font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)">{{ tenderData.password }}</span> *  ծածկագրով</p>
                <p style="font-size: 14px; text-align: right; margin-bottom: 2px; font-weight: 700;"><span style=" font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)">{{getTenderTypeByPlan()}}</span> հրավերի</p>
            </div>
          <div v-if="documentHtml" id='real-beneficiary-declaration-form' ref="savedDocument" v-html="documentHtml"></div>
          <div id='real-beneficiary-declaration-form' v-else ref="document" :handleLoaded="handleLoaded">
              <h5 style="text-align: center; font-weight: 700; margin-bottom: 2px; margin-top: 35px;">ՁԵՎ</h5>
              <h5 style="text-align: center; margin-top: 0;">ԻՐԱԿԱՆ ՇԱՀԱՌՈՒՆԵՐԻ ՎԵՐԱԲԵՐՅԱԼ ՀԱՅՏԱՐԱՐԱԳՐԻ</h5>
              <p style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-bottom: 5px;">1. Կազմակերպությունը</p>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0">1.1 Կազմակերպության տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.1.1 Անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.1.2 Անվանումը լատինատառ</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.1.3 Պետական գրանցման համարը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.1.4 Գրանցման օրը, ամիսը, տարին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.1.5 Գրանցման հասցեն</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.1.6 Գրանցման պետությունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.1.7 Գործադիր մարմնի ղեկավարի անունը և ազգանունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">1.2 Հայտարարագիրը ներկայացնող անձը</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.2.1 Հայտարարագիրը ներկայացնող անձի անունը և ազգանունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.2.2 Հայտարարագիրը ներկայացնող անձի պաշտոնը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">1.3 Հայտարարագրի ներկայացումը</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.3.1 Հայտարարագրի ստորագրման օրը, ամիսը, տարին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.3.2 Հայտարարագրի էջերի քանակը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">1.3.3 Հայտարարագիրը ներկայացնող անձի ստորագրությունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-bottom: 5px;">2. Բաժնետոմսերի ցուցակման տվյալները</p>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0">2.1 Բաժնետոմսերի ցուցակման տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.1.1 Ֆոնդային բորսայի անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.1.2 Հղումը բորսայում առկա փաստաթղթերին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">2.2 Կազմակերպությունը վերահսկող իրավաբանական անձի տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.2.1 Անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.2.2 Անվանումը լատինատառ</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.2.3 Պետական գրանցման համարը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.2.4 Գրանցման օրը, ամիսը, տարին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.2.5 Գրանցման հասցեն</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.2.6 Գրանցման պետությունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.2.7 Գործադիր մարմնի ղեկավարի անունը և ազգանունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">2.3 Վերահսկողության մակարդակը</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.3.1 Մասնակցության չափը (%)</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #006BE645; font-weight: 500;">2.3.2 Մասնակցության տեսակը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; ">
                      <div class="d-flex align-items-center">
                        <input type="radio" id="direct" name="checkstatus" value="1">
                        <label for="direct" style="margin-bottom: 0; margin-left: 5px;">Ուղղակի մասնակցություն</label> 
                      </div>
                      <div class="d-flex align-items-center" style="margin-top: 5px">
                        <input type="radio" id="indirect" name="checkstatus" value="2">  
                        <label for="indirect" style="margin-bottom: 0; margin-left: 5px;">Անուղղակի մասնակցություն</label>  
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-bottom: 5px;">3. Պետության, համայնքի կամ միջազգային կազմակերպության մասնակցությունը</p>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0">3.1 Պետության կամ համայնքի մասնակցությունը</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.1.1 Պետության անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.1.2 Համայնքի անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.1.3 Մասնակցության չափը (%)</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.1.4 Մասնակցության տեսակը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; ">
                      <div class="d-flex align-items-center">
                        <input type="radio" id="direct1" name="checkstatus1">
                        <label for="direct1" style="margin-bottom: 0; margin-left: 5px;">Ուղղակի մասնակցություն</label> 
                      </div>
                      <div class="d-flex align-items-center" style="margin-top: 5px">
                        <input type="radio" id="indirect1" name="checkstatus1"> 
                        <label for="indirect1" style="margin-bottom: 0; margin-left: 5px;">Անուղղակի մասնակցություն</label>  
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">3.2 Միջազգային կազմակերպության մասնակցությունը</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.2.1 Միջազգային կազմակերպության անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.2.2 Միջազգային կազմակերպության անվանումը լատինատառ</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.2.3 Մասնակցության չափը (%)</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">3.2.4 Մասնակցության տեսակը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; ">
                      <div class="d-flex align-items-center">
                        <input type="radio" id="direct2" name="checkstatus2">
                        <label for="direct2" style="margin-bottom: 0; margin-left: 5px;">Ուղղակի մասնակցություն</label> 
                      </div>
                      <div class="d-flex align-items-center" style="margin-top: 5px">
                        <input type="radio" id="indirect2" name="checkstatus2"> 
                        <label for="indirect2" style="margin-bottom: 0; margin-left: 5px;">Անուղղակի մասնակցություն</label>  
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-bottom: 5px;">4. Իրական շահառուի տվյալները</p>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0">4.1 Անձի ինքնությունը հավաստող տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.1.1 Անունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.1.2 Ազգանունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.1.3 Անունը (լատինատառ)</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.1.4 Ազգանունը (լատինատառ)</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.1.5 Քաղաքացիությունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.1.6 Ծննդյան օրը, ամիսը, տարին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">4.2 Անձը հաստատող փաստաթուղթը</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.2.1 Փաստաթղթի տեսակը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.2.2 Փաստաթղթի համարը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.2.3 Տրամադրման օրը, ամիսը, տարին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.2.4 Տրամադրող մարմինը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.2.5 ՀԾՀ կամ համարժեք համարը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">4.3 Անձի հաշվառման հասցեն</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.3.1 Պետությունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.3.2 Համայնքը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.3.3 Վարչատարածքային միավորը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.3.4 Փողոցի անվանումը, շենքը (տունը), բնակարանը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">4.4 Անձի բնակության հասցեն</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.4.1 Պետությունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.4.2 Համայնքը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.4.3 Վարչատարածքային միավորը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.4.4 Փողոցի անվանումը, շենքը (տունը), բնակարանը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">4.5 Իրական շահառու հանդիսանալու հիմքերը (բացառությամբ` ընդերքօգտագործման ոլորտի հաշվետու կազմակերպությունների)</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="a1" name="choosing1" style="margin-top: 5px;"> 
                        <label for="a1" style="margin-bottom: 0; margin-left: 15px;">ա. ուղղակի կամ անուղղակի տիրապետում է տվյալ իրավաբանական անձի՝ ձայնի իրավունք տվող բաժնեմասերի (բաժնետոմսերի, փայերի) 20 և ավելի տոկոսին կամ ուղղակի կամ անուղղակի կերպով ունի 20 և ավելի տոկոս մասնակցություն իրավաբանական անձի կանոնադրական կապիտալում</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.5.1. Մասնակցության չափը (%)</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.5.2. Մասնակցության տեսակը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; ">   
                      <div class="d-flex align-items-center">
                        <input type="radio" id="direct3" name="checkstatus3">
                        <label for="direct3" style="margin-bottom: 0; margin-left: 5px;">Ուղղակի մասնակցություն</label> 
                      </div>
                      <div class="d-flex align-items-center" style="margin-top: 5px">
                        <input type="radio" id="indirect3" name="checkstatus3"> 
                        <label for="indirect3" style="margin-bottom: 0; margin-left: 5px;">Անուղղակի մասնակցություն</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="b1" name="choosing1" style="margin-top: 5px;"> 
                        <label for="b1" style="margin-bottom: 0; margin-left: 15px;">բ. տվյալ իրավաբանական անձի նկատմամբ իրականացնում է իրական (փաստացի) վերահսկողություն այլ միջոցներով</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="g1" name="choosing1" style="margin-top: 5px;"> 
                        <label for="g1" style="margin-bottom: 0; margin-left: 15px;">գ. հանդիսանում է տվյալ իրավաբանական անձի գործունեության ընդհանուր կամ ընթացիկ ղեկավարումն իրականացնող պաշտոնատար անձ այն դեպքում, երբ առկա չէ «ա» և «բ» կետերի պահանջներին համապատասխանող ֆիզիկական անձ</label>  
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">4.6 Իրական շահառու հանդիսանալու հիմքերը (ընդերքօգտագործման ոլորտի հաշվետու կազմակերպությունների համար)</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="a" name="choosing" style="margin-top: 5px;"> 
                        <label for="a" style="margin-bottom: 0; margin-left: 15px;">ա. ուղղակի կամ անուղղակի կերպով տիրապետում է տվյալ իրավաբանական անձի` ձայնի իրավունք տվող բաժնեմասերի (բաժնետոմսերի, փայերի) 10 և ավելի տոկոսին կամ ուղղակի կամ անուղղակի կերպով ունի 10 և ավելի տոկոս մասնակցություն իրավաբանական անձի կանոնադրական կապիտալում</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.6.1. Մասնակցության չափը (%)</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.6.2. Մասնակցության տեսակը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; ">   
                      <div class="d-flex align-items-center">
                        <input type="radio" id="direct4" name="checkstatus4">
                        <label for="direct4" style="margin-bottom: 0; margin-left: 5px;">Ուղղակի մասնակցություն</label> 
                      </div>
                      <div class="d-flex align-items-center" style="margin-top: 5px">
                        <input type="radio" id="indirect4" name="checkstatus4"> 
                        <label for="indirect4" style="margin-bottom: 0; margin-left: 5px;">Անուղղակի մասնակցություն</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="b" name="choosing" style="margin-top: 5px;"> 
                        <label for="b" style="margin-bottom: 0; margin-left: 15px;">բ. իրավունք ունի նշանակելու կամ հեռացնելու իրավաբանական անձի կառավարման մարմինների անդամների մեծամասնությանը</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="g" name="choosing" style="margin-top: 5px;"> 
                        <label for="g" style="margin-bottom: 0; margin-left: 15px;">գ. իրավաբանական անձից անհատույց ստացել է հաշվետու տարվան նախորդող տարվա ընթացքում տվյալ իրավաբանական անձի ստացած շահույթի առնվազն 15 տոկոսի չափով օգուտ</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="d" name="choosing" style="margin-top: 5px;"> 
                        <label for="d" style="margin-bottom: 0; margin-left: 15px;">դ. իրավաբանական անձի նկատմամբ իրականացնում է իրական (փաստացի) վերահսկողություն այլ միջոցներով</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">
                      <div class="d-flex align-items-start" style="margin-top: 5px">
                        <input type="radio" id="e" name="choosing" style="margin-top: 5px;"> 
                        <label for="e" style="margin-bottom: 0; margin-left: 15px;">ե. հանդիսանում է տվյալ իրավաբանական անձի գործունեության ընդհանուր կամ ընթացիկ ղեկավարումն իրականացնող պաշտոնատար անձ այն դեպքում, երբ առկա չէ «ա»-«դ» կետերի պահանջներին համապատասխանող ֆիզիկական անձ</label>  
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">4.7 Իրական շահառուի կարգավիճակի վերաբերյալ տեղեկությունները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.7.1. Իրական շահառու դառնալու օրը, ամիսը, տարին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.7.2. Կազմակերպության նկատմամբ վերահսկողության իրականացումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; ">   
                      <div class="d-flex align-items-center">
                        <input type="radio" id="direct5" name="checkstatus5">
                        <label for="direct5" style="margin-bottom: 0; margin-left: 5px;">Առանձին</label> 
                      </div>
                      <div class="d-flex align-items-center" style="margin-top: 5px">
                        <input type="radio" id="indirect5" name="checkstatus5"> 
                        <label for="indirect5" style="margin-bottom: 0; margin-left: 5px;">Փոխկապակցված անձանց հետ համատեղ</label>  
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.7.3. Ընդերքօգտագործման ոլորտի հաշվետու կազմակերպության իրական շահառուն հանդիսանում է պաշտոնատար անձ կամ նրա ընտանիքի անդամ</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; ">   
                      <div class="d-flex align-items-center">
                        <input type="radio" id="direct6" name="checkstatus6">
                        <label for="direct6" style="margin-bottom: 0; margin-left: 5px;">Այո</label> 
                      </div>
                      <div class="d-flex align-items-center" style="margin-top: 5px">
                        <input type="radio" id="indirect6" name="checkstatus6"> 
                        <label for="indirect6" style="margin-bottom: 0; margin-left: 5px;">Ոչ</label>  
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">4.8. Իրական շահառուի կոնտակտային տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.8.1. Էլ. փոստի հասցեն</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">4.8.2. Հեռախոսահամարը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-bottom: 5px;">5. Միջանկյալ իրավաբանական անձինք</p>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0">5.1. Կազմակերպության տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.1.1. Անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.1.2. Անվանումը լատինատառ</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.1.3. Պետական գրանցման համարը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.1.4. Գրանցման օրը, ամիսը, տարին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.1.5. Գրանցման հասցեն</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.1.6. Գրանցման պետությունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.1.7. Գործադիր մարմնի ղեկավարի անունը և ազգանունը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">5.2. Իրական շահառուի տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td rowspan="5" style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500; vertical-align: center">5.2.1. Իրական շահառու(ներ)ի անունը և ազգանունը, ում համար կազմակերպությունը հանդիսանում է միջանկյալ իրավաբանական անձ</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; height: 40px"></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; height: 40px"></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; height: 40px"></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; height: 40px"></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; height: 40px"></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; margin-left: 20px; margin-bottom: 0; margin-top: 0">5.3. Միջանկյալ իրավաբանական անձի բաժնետոմսերի ցուցակման տվյալները</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.3.1. Ֆոնդային բորսայի անվանումը</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                  <tr>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; background-color: #1e7bb745; font-weight: 500;">5.3.2. Հղումը բորսայում առկա փաստաթղթերին</td>
                    <td style="width: 50%; padding: 5px; border: 1px solid gray; "></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-bottom: 5px;">6. Լրացուցիչ նշումներ</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; font-weight: 500;">Լրացուցիչ տեղեկություններ կամ հավելյալ պարզաբանումներ, որոնք առնչվում են հայտարարագրում լրացված կամ լրացման ենթակա տվյալներին</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="width: 50%; padding: 5px; border: 1px solid gray; height: 150px;"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table style="width: 100%; margin-top: 30px; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td>
                    <p style="text-align: center; margin-bottom: 0;">«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }} , <span v-if="me.organisation[0].translations.company_type.hy !== 'Ա/Ձ' && me.organisation[0].id_card_number === null || me.organisation[0].id_card_number === '' || me.organisation[0].id_card_number === undefined">տնօրեն ՝</span> {{ me.organisation[0].translations.director_name.hy }} </p>
                    <p class="ft-6" style="font-size: 10px; text-align: center; color: rgb(17, 85, 204);">Մասնակցի անվանումը  (ղեկավարի պաշտոնը, անուն ազգանունը,</p>
                  </td>
                  <td>
                    <p style="text-align: center; margin-bottom: 0;">________________________</p>
                    <p class="ft-6" style="font-size: 10px; text-align: center;">ստորագրությունը)</p>
                  </td>
                </tr>
              </tbody>
            </table>
        </div> 
  </div>
</template>

<script>
import purchaseTypes from '@/mixins/purchaseTypes'

export default {
    name: 'real_beneficiary_declaration_form',
    mixins: [purchaseTypes],
    components: {},
    props: ['handleLoaded', 'tender'],
    data() {
        return {
            documentHtml: false,
            participantInfo: {},
            participantsSequence: [],
            rows: [],
            tenderData: {},
            beneficiaries: [],
            totalMembers: 0,
            isWithArmenianResources: false,
			      isLoaded: false,
        }
    },
    async mounted() {
      this.participantMainInfo = this.me.organisation[0]
      this.participantInfo = this.me.organisation[0].translations
      this.isWithArmenianResources = this.tender.isWithArmenianResources
      this.rows = this.tender.selectedRows
      this.beneficiaries = this.tender.realBeneficiaries
      this.workersCount = this.tender.workersCount
      this.tenderData = this.tender.tender

      await this.$client.get('getRealBeneficiariesDeclaration').then(({data}) => {
        if(data){
          this.documentHtml = data
        }
      })
          
      await this.rows.forEach(async (row, index) => {
        if(index === this.rows.length-1){
          this.isLoaded = true;
          await this.handleLoaded()
        }
      })
    },
    computed: {
        me() {
            return this.$store.getters['user/me']
        },
    },
    methods: {
        save(changedHtml) {
            this.$store.dispatch('user/userEdit', {
                fields: {"real_beneficiaries_declaration_html": changedHtml},
            }).then(response => {
                console.log(response)
            })
        },
        consoleLog(msg) {
            console.log(msg)
        },
        getTenderTypeByPlan(){
          return this.tenderData.procedure ? this.purchaseTypesLongNamesCased.hy[this.tenderData.procedure.id] : '';
        },
    },
}
</script>

<style scoped>
  *{
    font-family: GHEA grapalat  !important;
  }
</style>

