<template>
  <div class="auth-main-block">
    <div class="signup-spacing">
      <form-wizard
        ref="signForm"
        @on-complete="onComplete" 
        shape="circle"
        color="#006BE6"
      >
        <tab-content ref="tab1" title="Անձնական տվյալներ" :before-change="() => validadeFormOne()">
          <form :key="type">
            <div class="signup-top-spacing">
              <h1 class="signup-title">Անձնական տվյալներ</h1>
              <p class="person-type d-flex align-items-center justify-content-center" v-if="isPrivate">
                <label class="reg_radio_buttons d-flex align-items-center">
                  <input type="radio" class="r_type" value="legalEntity" name="radio" v-model="type">
                  <span></span>
                  <b class="person-type-content">Իրավաբանական անձ</b>
                </label>
                <label class="reg_radio_buttons d-flex align-items-center">
                  <input type="radio" class="r_type" value="person" name="radio" v-model="type">
                  <span></span>
                  <b class="person-type-content">Ֆիզիկական անձ</b>
                </label>
              </p>
              <div class="form-block">
                <div v-if="type === 'legalEntity'">
                  <div class="d-flex justify-content-between form-block-item mob-auth-block">
                    <div>
                      <float-label :dispatch="false">
                        <input
                          v-if="isPrivate"
                          v-model="$v.page1.name.hy.$model"
                          :placeholder="$t('private_customer.user_name')"
                          type="text"
                          name="name"
                          class="auth-input pr-3"
                          :class="{'border-danger': isInvalidField('name.hy', 'required', 'page1')}" />
                        <input
                          v-else
                          v-model="$v.page1.name.hy.$model"
                          :placeholder="$t('state_customer.pl_name')"
                          type="text"
                          name="name"
                          class="auth-input pr-3"
                          :class="{'border-danger': isInvalidField('name.hy', 'required', 'page1')}" />
                      </float-label>
                      <div v-if="isInvalidField('name.hy', 'required', 'page1')"
                        class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div>
                      <select
                        v-if="isPrivate"
                        id="company-type"
                        v-model="$v.page1.company_type.hy.$model"
                        name="company_type"
                        class="auth-input pr-3 styled-select"
                        :class="{'border-danger': isInvalidField('company_type.hy', 'required', 'page1')}" >
                        <option value="" disabled>Ընտրել տեսակ</option>
                        <option value="ՍՊԸ">ՍՊԸ</option>
                        <option value="Ա/Ձ">Ա/Ձ</option>
                        <option value="ԲԲԸ">ԲԲԸ</option>
                        <option value="Ա/Կ">Ա/Կ</option>
                        <option value="ՓԲԸ">ՓԲԸ</option>
                        <option value="Հիմնադրամ">Հիմնադրամ</option>
                        <option value="Հ/Կ">Հ/Կ</option>
                        <option value="other">Այլ</option>
                      </select>
                      <select
                        v-else
                        id="company-type"
                        v-model="$v.page1.company_type.hy.$model"
                        name="company_type"
                        class="auth-input pr-3 styled-select"
                        :class="{'border-danger': isInvalidField('company_type.hy', 'required', 'page1')}" >
                        <option value="" disabled>Ընտրել տեսակ</option>
                        <option value="ՍՊԸ">ՍՊԸ</option>
                        <option value="ՊՈԱԿ">ՊՈԱԿ</option>
                        <option value="ՓԲԸ">ՓԲԸ</option>
                        <option value="ՀՈԱԿ">ՀՈԱԿ</option>
                        <option value="Հիմնադրամ">Հիմնադրամ</option>
                        <option value="Համայնքապետարան">Համայնքապետարան</option>
                        <option value="Քաղաքապետարան">Քաղաքապետարան</option>
                        <option value="Կոմիտե">Կոմիտե</option>
                      </select>
                      <div v-if="isInvalidField('company_type.hy', 'required', 'page1')"
                        class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between form-block-item mob-auth-block">
                    <div>
                      <float-label :dispatch="false">
                        <input
                          v-if="isPrivate"
                          id="name-ru"
                          v-model="$v.page1.name.ru.$model"
                          :placeholder="$t('private_customer.user_name_ru')"
                          type="text"
                          name="company_name_ru"
                          class="auth-input pr-3"
                          :class="{'border-danger': isInvalidField('name.ru', 'required', 'page1')}"
                        />
                        <input
                          v-else
                          id="name-ru"
                          v-model="$v.page1.name.ru.$model"
                          :placeholder="$t('state_customer.pl_name_rus')"
                          type="text"
                          name="company_name_ru"
                          class="auth-input pr-3"
                          :class="{'border-danger': isInvalidField('name.ru', 'required', 'page1')}"
                        />
                      </float-label>
                      <div v-if="isInvalidField('name.ru', 'required', 'page1')"
                        class="small text-danger warning-text">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div>
                      <select
                        v-if="isPrivate"
                        id="company-type-ru"
                        v-model="$v.page1.company_type.ru.$model"
                        name="company_type_ru"
                        class="auth-input pr-3 styled-select"
                        :class="{'border-danger': isInvalidField('company_type.ru', 'required', 'page1')}" >
                        <option value="" disabled>Выбрать</option>
                        <option value="ООО">ООО</option>
                        <option value="И/П">И/П</option>
                        <option value="ОАО">ОАО</option>
                        <option value="П/О">П/О</option>
                        <option value="К/О">К/О</option>
                        <option value="ЗАО">ЗАО</option>
                        <option value="ФОНД">ФОНД</option>
                        <option value="O/О">O/О</option>
                        <option value="other">Другоe</option>
                      </select>
                      <select
                        v-else
                        id="company-type-ru"
                        v-model="$v.page1.company_type.ru.$model"
                        name="company_type_ru"
                        class="auth-input pr-3 styled-select"
                        :class="{'border-danger': isInvalidField('company_type.ru', 'required', 'page1')}" >
                        <option value="" disabled>Выбрать</option>
                        <option value="ООО">ООО</option>
                        <option value="ГНКО">ГНКО</option>
                        <option value="ЗАО">ЗАО</option>
                        <option value="ОНКО">ОНКО</option>
                        <option value="фонд">фонд</option>
                        <option value="община">община</option>
                        <option value="муниципалитет">муниципалитет</option>
                        <option value="комитет">комитет</option>
                      </select>
                      <div v-if="isInvalidField('company_type.ru', 'required', 'page1')"
                        class="small text-danger warning-text">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="d-flex justify-content-between form-block-item mob-auth-block">
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page1.name.hy.$model"
                        :placeholder="$t('private_customer.user_name_surname')"
                        type="text"
                        name="company_name"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('name.hy', 'required', 'page1')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('name.hy', 'required', 'page1')"
                      class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page1.name.ru.$model"
                        :placeholder="$t('private_customer.user_name_surname_ru')"
                        type="text"
                        name="company_name_ru"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('name.ru', 'required', 'page1')}" />
                    </float-label>
                    <div v-if="isInvalidField('name.ru', 'required', 'page1')"
                      class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between form-block-item mob-auth-block">
                  <div>
                    <float-label class="text-secondary" :dispatch="false">
                      <input
                        id="username"
                        v-model.trim="$v.page1.username.$model"
                        type="username"
                        placeholder="Մուտքանուն"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('username', 'required', 'page1')}"
                        name="r_mail" />
                    </float-label>
                    <div v-if="errorMsgFromApi" class="small text-danger warning-text">Մուտքանունը զբաղված է</div>
                    <div v-if="isInvalidField('username', 'required', 'page1')" class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}</div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <vue-tel-input 
                        id="phone"
                        class="auth-input pr-3 pl-0"
                        :validCharactersOnly="true"
                        :inputOptions = "{'placeholder': $t('state_customer.pl_tel')}"
                        :class="{'border-danger': isInvalidField('phone', 'required', 'page1') || isInvalidPhone}"
                        v-model="phoneNumber"
                        @validate="validatePhone"
                        name="r_phone"
                        v-bind="bindProps">
                        <template v-slot:arrow-icon>
                          <span>{{ open ? '' : '' }}</span>
                        </template>
                      </vue-tel-input>  
                    </float-label>
                    <div v-if="isInvalidField('phone', 'required', 'page1')" class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}</div>
                    <div v-else-if="isInvalidPhone" class="small text-danger warning-text">{{ $t('state_customer.valid_3') }}</div>
                  </div>
                </div>
                <div class="d-flex justify-content-between form-block-item mob-auth-block">
                  <div>
                    <float-label class="text-secondary" :dispatch="false">
                      <input
                        id="email"
                        v-model="$v.page1.email.$model"
                        type="email"
                        :placeholder="$t('home.subscribe-area.placeholder')"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('email', 'required', 'page1') || isInvalidField('email', 'email', 'page1')}"
                        name="r_mail"
                      />
                    </float-label>
                    <div v-if="isInvalidField('email', 'required', 'page1')" class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}</div>
                    <div v-if="isInvalidField('email', 'email', 'page1')" class="small text-danger warning-text">{{ $t('state_customer.valid_2') }}</div>
                  </div>
                </div>
                <div class="d-flex justify-content-between form-block-item mob-auth-block">
                  <div>
                    <float-label :dispatch="false">
                      <input
                        id="password"
                        autocomplete="true"
                        v-model="$v.page1.password.$model"
                        :type="showPassword ? 'text' : 'password'"
                        :placeholder="$t('state_customer.pl_password')"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('password', 'required', 'page1') || isInvalidField('password', 'minLength', 'page1')}"
                        name="password"
                      />
                      <svg width="24" height="24" class="show-password" @click="showPasswordFunc(1)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C3.23377 7.93333 7.25974 5 12 5C16.7403 5 20.7013 7.93333 22 12C20.7013 16.0667 16.7403 19 12 19C7.25974 19 3.23377 16 2 12ZM4.07792 12C5.31169 15 8.49351 17 12 17C15.5065 17 18.6234 14.9333 19.9221 12C18.6883 9 15.5065 7 12 7C8.42857 7 5.31169 9 4.07792 12ZM9 12C9 10.3636 10.3636 9 12 9C13.6364 9 15 10.2955 15 12C15 13.7045 13.6364 15 12 15C10.2955 15 9 13.6364 9 12Z" :fill="showPassword ? '#006BE6' : '#ABAEB8'"/>
                      </svg>
                    </float-label>
                    <div v-if="isInvalidField('password', 'required', 'page1')" class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}</div>
                    <div v-if="isInvalidField('password', 'minLength', 'page1')" class="small text-danger warning-text"> {{ $t('state_customer.valid_4') }}</div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <input
                        id="repeat-password"
                        autocomplete="true"
                        v-model="$v.page1.password_confirmation.$model"
                        :type="showRepeatPassword ? 'text' : 'password'"
                        :placeholder="$t('state_customer.repeat_pl_password')"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('password_confirmation', 'required', 'page1') || isInvalidField('password_confirmation', 'sameAsPassword', 'page1')}"
                        name="repeat-password"
                      />
                      <svg width="24" height="24" class="show-password" @click="showPasswordFunc(2)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C3.23377 7.93333 7.25974 5 12 5C16.7403 5 20.7013 7.93333 22 12C20.7013 16.0667 16.7403 19 12 19C7.25974 19 3.23377 16 2 12ZM4.07792 12C5.31169 15 8.49351 17 12 17C15.5065 17 18.6234 14.9333 19.9221 12C18.6883 9 15.5065 7 12 7C8.42857 7 5.31169 9 4.07792 12ZM9 12C9 10.3636 10.3636 9 12 9C13.6364 9 15 10.2955 15 12C15 13.7045 13.6364 15 12 15C10.2955 15 9 13.6364 9 12Z" :fill="showRepeatPassword ? '#006BE6' : '#ABAEB8'"/>
                      </svg>
                    </float-label>
                    <div v-if="isInvalidField('password_confirmation', 'required', 'page1')" class="small text-danger warning-text">{{ $t('state_customer.valid_1') }}</div>
                    <div v-if="isInvalidField('password_confirmation', 'sameAsPassword', 'page1')" class="small text-danger warning-text">{{ $t('state_customer.valid_5') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </form>  
        </tab-content>
        <tab-content ref="tab2" title="Գրանցման հասցե" :before-change="() => validadeFormTwo()">
          <form :key="type">
            <div class="signup-top-spacing">
              <h1 class="signup-title">Գրանցման հասցե</h1>
              <div class="form-block">
                <div class="d-flex justify-content-between form-block-second-item">
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page2.region.hy.$model"
                        :placeholder="$t('state_customer.pl_state')"
                        type="text"
                        name="company_region"
                        class="auth-input"
                        :class="{'border-danger': isInvalidField('region.hy', 'required', 'page2')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('region.hy', 'required', 'page2')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page2.city.hy.$model"
                        :placeholder="$t('state_customer.pl_city')"
                        type="text"
                        name="company_city"
                        class="auth-input"
                        :class="{'border-danger': isInvalidField('city.hy', 'required', 'page2')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('city.hy', 'required', 'page2')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page2.address.hy.$model"
                        :placeholder="$t('state_customer.pl_address')"
                        type="text"
                        name="company_address"
                        class="auth-input"
                        :class="{'border-danger': isInvalidField('address.hy', 'required', 'page2')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('address.hy', 'required', 'page2')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between form-block-second-item">
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page2.region.ru.$model"
                        :placeholder="$t('state_customer.pl_state_rus')"
                        type="text"
                        name="company_region_ru"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('region.ru', 'required', 'page2')}"
                        value=""
                      />
                    </float-label>
                    <div v-if="isInvalidField('region.ru', 'required', 'page2')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page2.city.ru.$model"
                        :placeholder="$t('state_customer.pl_city_rus')"
                        type="text"
                        name="company_city_ru"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('city.ru', 'required', 'page2')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('city.ru', 'required', 'page2')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page2.address.ru.$model"
                        :placeholder="$t('state_customer.pl_address_rus')"
                        type="text"
                        name="company_address_ru"
                        class="auth-input pr-3"
                        :class="{'border-danger': isInvalidField('address.ru', 'required', 'page2')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('address.ru', 'required', 'page2')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>  
        </tab-content>
        <tab-content ref="tab3" title="Բանկային տվյալներ">
          <form :key="type">
            <div class="signup-top-spacing">
              <h1 class="signup-title">Բանկային տվյալներ</h1>
              <div class="form-block mb-3">
                <div v-if="type === 'person'">
                  <div class="d-flex justify-content-between form-block-item">
                    <div>
                      <float-label :dispatch="false">
                        <the-mask 
                          mask="###############################"
                          id="id_card_number"
                          v-model="$v.page3.id_card_number.$model"
                          type="text"
                          :placeholder="$t('private_customer.id_card_number')"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('id_card_number', 'required', 'page3')}"
                          name="id_card_number"
                        />
                      </float-label>
                      <div v-if="isInvalidField('id_card_number', 'required', 'page3')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    </div>
                    <div>
                      <float-label :dispatch="false">
                        <input
                          id="passport_serial"
                          v-model="$v.page3.passport.serial_number.$model"
                          type="text"
                          :placeholder="$t('private_customer.passport.serial_number')"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('passport.serial_number', 'required', 'page3')}"
                          name="passport_serial"
                        />
                      </float-label>
                      <div v-if="isInvalidField('passport.serial_number', 'required', 'page3')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between form-block-second-item">
                    <div>
                      <float-label :dispatch="false">
                        <input
                          id="passport_start"
                          v-model="$v.page3.passport.given_at.$model"
                          type="text"
                          v-mask="'##/##/####'"
                          :placeholder="$t('private_customer.passport.given_at')"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('passport.given_at', 'required', 'page3')}"
                          name="passport_start"
                        />
                      </float-label>
                      <div v-if="isInvalidField('passport.given_at', 'required', 'page3')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                      <div v-if="isInvalidField('passport.given_at', 'validDate', 'page3')" class="small text-danger">{{ $t('private_customer.valid_phone') }}</div>
                    </div>
                    <div>
                      <float-label :dispatch="false">
                        <input
                          id="passport_end"
                          v-model="$v.page3.passport.valid_until.$model"
                          type="tel"
                          v-mask="'##/##/####'"
                          :placeholder="$t('private_customer.passport.valid_until')"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('passport.valid_until', 'required', 'page3')}"
                          name="passport_end"
                        />
                      </float-label>
                      <div v-if="isInvalidField('passport.valid_until', 'required', 'page3')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                      <div v-if="isInvalidField('passport.valid_until', 'validDate', 'page3')" class="small text-danger">{{ $t('private_customer.valid_phone') }}</div>
                    </div>
                    <div>
                      <float-label :dispatch="false">
                        <the-mask 
                          mask="###"
                          v-model="$v.page3.passport.from.$model"
                          id="passport_who"
                          :placeholder="$t('private_customer.passport.from')"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('passport.from', 'required', 'page3')}"
                          name="passport_who"
                        />
                      </float-label>
                      <div v-if="isInvalidField('passport.from', 'required', 'page3')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between form-block-item">
                  <div>
                    <float-label :dispatch="false">
                      <input
                        id="bank-name"
                        v-model="$v.page3.bank_name.hy.$model"
                        :placeholder="isPrivate ? $t('private_customer.pl_bank') : $t('state_customer.pl_bank')"
                        type="text"
                        name="bank_name"
                        class="auth-input"
                        :class="{'border-danger': isInvalidField('bank_name.hy', 'required', 'page3')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('bank_name.hy', 'required', 'page3')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div>
                    <float-label :dispatch="false">
                      <input
                        v-model="$v.page3.bank_name.ru.$model"
                        :placeholder="isPrivate ? $t('private_customer.pl_bank_rus') : $t('state_customer.pl_bank_rus')"
                        type="text"
                        name="bank_name_ru"
                        class="auth-input"
                        :class="{'border-danger': isInvalidField('bank_name.ru', 'required', 'page3')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('bank_name.ru', 'required', 'page3')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>
                <div v-if="type === 'legalEntity'">
                  <div class="d-flex justify-content-between form-block-item">
                    <div>
                      <float-label :dispatch="false">
                        <the-mask 
                          id="bank-account"
                          v-model="$v.page3.bank_account.$model"
                          :placeholder="$t('state_customer.pl_account_number')"
                          type="text"
                          min="0"
                          name="bank_account"
                          maxlength="16"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('bank_account', 'required', 'page3')}"
                          mask="###############################"
                        />
                      </float-label>
                      <div v-if="isInvalidField('bank_account', 'required', 'page3')"
                        class="small text-danger warning-text">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div>
                      <float-label :dispatch="false">
                        <the-mask 
                          mask="###############################"
                          id="tin"
                          v-model="$v.page3.tin.$model"
                          :placeholder="$t('state_customer.pl_hvhh')"
                          type="text"
                          name="hvhh"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('tin', 'required', 'page3')}"
                        />
                      </float-label>
                      <div v-if="isInvalidField('tin', 'required', 'page3')"
                        class="small text-danger warning-text">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between form-block-item">
                    <div>
                      <float-label v-if="isPrivate" :dispatch="false">
                        <input
                          id="director-name-hy"
                          v-model="$v.page3.director_name.hy.$model"
                          :placeholder="$t('private_customer.user_director')"
                          type="text"
                          name="director_name"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('director_name.hy', 'required', 'page3')}"
                        />
                      </float-label>
                      <float-label v-else :dispatch="false">
                        <input
                          id="pl-name-hy"
                          v-model="$v.page3.director_name.hy.$model"
                          :placeholder="$t('state_customer.pl_name_surname')"
                          type="text"
                          name="director_name"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('director_name.hy', 'required', 'page3')}"
                        />
                      </float-label>
                      <div v-if="isInvalidField('director_name.hy', 'required', 'page3')"
                        class="small text-danger warning-text">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div>
                      <float-label v-if="isPrivate" :dispatch="false">
                        <input
                          id="director-name-ru"
                          v-model="$v.page3.director_name.ru.$model"
                          :placeholder="$t('private_customer.user_director_ru')"
                          type="text"
                          name="director_name"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('director_name.ru', 'required', 'page3')}"
                        />
                      </float-label>
                      <float-label v-else :dispatch="false">
                        <input
                          id="director-name-ru"
                          v-model="$v.page3.director_name.ru.$model"
                          :placeholder="$t('state_customer.pl_name_surname_rus', 'page3')"
                          type="text"
                          name="director_name_ru"
                          class="auth-input"
                          :class="{'border-danger': isInvalidField('director_name.ru', 'required', 'page3')}"
                        />
                      </float-label>
                      <div v-if="isInvalidField('director_name.ru', 'required', 'page3')"
                        class="small text-danger warning-text">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="type === 'person'">
                  <div class="d-flex justify-content-between form-block-item">
                    <float-label :dispatch="false">
                      <input
                        id="bank-account"
                        v-model="$v.page3.bank_account.$model"
                        :placeholder="$t('state_customer.pl_account_number')"
                        type="number"
                        min="0"
                        name="bank_account"
                        maxlength="16"
                        class="auth-input"
                        :class="{'border-danger': isInvalidField('bank_account', 'required', 'page3')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('bank_account', 'required', 'page3')"
                      class="small text-danger warning-text">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>
              </div> 
            </div>  
            <div class="block-width">
              <label class="myCheckbox">
                <input
                  v-model="$v.agreeToTerms.$model"
                  type="checkbox"
                  name="r_remember"
                  class="r_checkbox mt-0 checkbox-styles"
                />
                <span></span>
                <p v-if="$v.agreeToTerms.$dirty && $v.agreeToTerms.$invalid" class="small text-danger i_agree i_agree_tender small">
                  {{ $t('state_customer.studied') }}
                  <router-link to="/regulation">{{ $t('state_customer.regulation') }}</router-link> {{ $t('state_customer.regulation_text') }}
                </p>
                <p v-else class="i_agree i_agree_tender small">
                  {{ $t('state_customer.studied') }}
                  <router-link to="/regulation">{{ $t('state_customer.regulation') }}</router-link> {{ $t('state_customer.regulation_text') }}
                </p>
              </label>
              <div class="reg_form mt-4 mb-5">
                <label class="robot small">
                  <span>    {{ $t('state_customer.code') }}</span>
                  <VueRecaptcha :sitekey="this.sitekey" :loadRecaptchaScript="true" language='hy' @verify="validate"/>
                  <div v-if="$v.captcha.$dirty && $v.captcha.$invalid"
                    class="small text-danger">
                    {{ $t('state_customer.valid_captcha') }}
                  </div>
                </label>
              </div> 
            </div>
          </form>  
        </tab-content>
        <el-button slot="prev" class="prev-btn">
          <svg width="22" height="18" viewBox="0 0 22 18">
          <path d="M22 7.33871H5.64103L10.906 2.06989L8.83761 0L2.06838 6.77419L0 8.84409L2.06838 10.914L8.83761 17.5L10.906 15.4301L5.64103 10.1613H22V7.33871Z" fill="#6E7485"/>
          </svg>
        </el-button>
        <el-button slot="next" class="button_H48 btn-width">Առաջ</el-button>
        <el-button slot="finish" class="button_H48 btn-width" @click.prevent="signup" name="signup-btn" id="signup-btn">                
          {{ $t('state_customer.btn_register') }}    
        </el-button>
      </form-wizard>
      <div class="d-flex justify-content-center login-btn">
        <p style="margin-right: 4px">Ունեմ հաշիվ </p>
        <router-link tag="span" to="/login"> Մուտք</router-link> 
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength, sameAs, numeric } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'
import moment from 'moment'
import $ from 'jquery'

const validDate = (value, vm) => {
  var date = moment(value, "DD-MM-YYYY");
  var currentDate = moment(new Date());
  var yearDiff = currentDate.year() - date.year();
  if(!date.isValid() || yearDiff > 10) {
    return false
  }
  return true
};
export default {
  name: 'StateSignup',
  components: {VueRecaptcha},
  data () {
    return {
      showPassword: false,
      showRepeatPassword: false,
      bindProps: {
        defaultCountry : "AM",
        autoDefaultCountry: false,
        dropdownOptions: {
          showDialCodeInList: true,
          showFlags: true,
          showDialCodeInSelection: true
        },
      },
      sitekey: "6LeRVEEaAAAAAJU28gZTNKGoVpfZJ3tHidw8Nx48",
      phoneNumber: "",
      isInvalidPhone: false,
      type: 'legalEntity',
      isErrorShake: false,
      page1: {
        type: this.$route.params.type === "private" ? 'user' : this.$route.params.type,
        name: {
          hy: '',
          ru: '',
        },
        company_type: {
          hy: '',
          ru: '',
        },
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        phone: '',
      },
      page2: {
        region: {
          hy: '',
          ru: '',
        },
        city: {
          hy: '',
          ru: '',
        },
        address: {
          hy: '',
          ru: '',
        },
      },
      page3: {
        tin: '',
        passport: {
          serial_number: '',
          given_at: '',
          from: '',
          valid_until: '',
        },
        id_card_number: '',
        bank_account: '',
        bank_name: {
          hy: '',
          ru: '',
        },
        director_name: {
          hy: '',
          ru: '',
        },
        director_position: {
          hy: '',
          ru: '',
        }
      },
      agreeToTerms: false,
      captcha: false,
      errorMsgFromApi: '',
      userType: this.$route.params.type,
      isPrivate: this.$route.params.type === 'private'
    }
  },
  watch: {
    $route(newValue, oldValue) {
      const type = this.$route.params.type
      this.type = 'legalEntity';
      this.isPrivate = type === 'private';
      this.userType = type;
      this.page1.type = type === "private" ? 'user' : type;
      this.$refs.signForm.prevTab();
      this.$refs.signForm.prevTab();
    },
  },
  methods: {
    showPasswordFunc(id){
      if(id === 1){
        this.showPassword = !this.showPassword 
      }else{
        this.showRepeatPassword = !this.showRepeatPassword 
      }
    },
    consoleLog(e){
      console.log(e)
    },
    open(){
      console.log(1)
    },
    validate () {
      this.$v.captcha.$model = true;
    },
    validatePhone (item) {
      const valid = item.valid;
      if (valid !== undefined){
        this.$v.page1.phone.$model = item.number;
        if(!item.valid){
          this.isInvalidPhone = true;
        }
        else{
          this.isInvalidPhone = false;
        }
      }
    },
    validadeFormOne(){
      if(!this.$v.page1.$invalid){
        this.$refs.tab1.icon = 'fas fa-check'
        $('.wizard-icon-circle').eq(0).css('background-color', '#006BE6');
        return true;
      } else {
        this.$v.page1.$touch()
      }
    },
    validadeFormTwo(){
      if(!this.$v.page2.$invalid){
        this.$refs.tab2.icon = 'fas fa-check'
        $('.wizard-icon-circle').eq(1).css('background-color', '#006BE6');
        return true;
      } else {
        this.$v.page2.$touch()
      }
    },
    onComplete(){
      console.log('onComplete')
    },
    signup () {
      const fields = {...this.page1, ...this.page2, ...this.page3}
      if(!this.$v.page3.$invalid && this.agreeToTerms) {
        if(fields.company_type.hy === 'other'){
          fields.company_type.hy = '';
        }
        if(fields.company_type.ru === 'other'){
          fields.company_type.ru = '';
        }
        this.$store.dispatch('auth', {
          url: 'signup',
          fields: fields,
          rememberMe: false,
          type: fields.type,
        })
          .then(response => {
            if (response.message === "Validation Error") {
              this.isErrorShake = true
              setTimeout(() => {
                this.isErrorShake = false
              }, 700)
              this.errorMsgFromApi = response.message;
              this.$refs.signForm.prevTab();
              this.$refs.signForm.prevTab();
            } else {
              this.$router.push({ path: '/login' })
            }
          }) 
      } else {
        this.$v.page3.$touch()
        this.$v.agreeToTerms.$touch()
        this.$v.captcha.$touch()
      }
    },
    isInvalidField (pathToField, validator, page) {
      const keyArr = pathToField.split('.')
      const field = keyArr.reduce((acc, key) => {
        return acc[key]
      }, this.$v[page])
      return validator === 'required' ?
        field.$dirty && !field.required :
        field.required && !field[validator]
    }
  },
  validations() {
    const validationRules = {
      page1: {
        type: {},
        name: {
          hy: { required },
          ru: { required },
        },
        username: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        password_confirmation: { required, sameAsPassword: sameAs('password') },
        phone: { required },
      },
      page2: {
        region: {
          hy: { required },
          ru: { required },
        },
        city: {
          hy: { required },
          ru: { required },
        },
        address: {
          hy: { required },
          ru: { required },
        },
      },
      page3: {
        bank_account: { required, numeric },
        bank_name: {
          hy: { required },
          ru: { required },
        },
      },
      captcha: { checked: value => value },
      agreeToTerms: { checked: value => value },
    }

    if (this.type === 'person') {
      const privateValidationRules = {
        passport: {
          serial_number: { required },
          given_at: { required, validDate },
          from: { required, numeric },
          valid_until: { required, validDate },
        },
        id_card_number: { required, numeric }
      }
      validationRules.page3 = Object.assign(validationRules.page3, privateValidationRules);
      return validationRules;
    } else {
      const privateValidationRules = {
        director_name: {
          hy: { required },
          ru: { required },
        },
        tin: { required, numeric },
      }
      validationRules.page1 = Object.assign(validationRules.page1,         {company_type: {
          hy: { required },
          ru: { required },
        }});
      validationRules.page3 = Object.assign(validationRules.page3, privateValidationRules);
      return validationRules;
    }
  }
}
</script>
<style>
.wizard-icon-circle.checked .wizard-icon{
  color: white;
}
.auth-input .vti__dropdown{
  border-radius: 12px;
}
</style>
<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>