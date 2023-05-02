<template>
    <div class="card" :class="open ? 'opened' : ''">
      <div class="card-header">
        <button @click="() => open = !open" class="d-flex w-100 justify-content-between align-items-center" type="button" data-toggle="collapse" data-target="#userSettingsCollapse" aria-expanded="false" aria-controls="userSettingsCollapse">
          <h4 data-target="#userSettingsCollapse" aria-expanded="false" aria-controls="userSettingsCollapse" class="mb-0">Անձնական տվյալներ</h4>
          <svg width="14" height="8" viewBox="0 0 14 8">
            <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
          </svg>
        </button>
      </div>
      <div id="userSettingsCollapse" class="collapse multi-collapse">
        <div class="card-body d-flex flex-column padding-20">
            <div>
              <form class="form-parsley" :key="type">
                <!-- Email / Phone -->
                <div class="form-row">
                  <div class="col-md-12 padding-b-20">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        id="username"
                        v-model="$v.fields.username.$model"
                        type="username"
                        placeholder="Մուտքանուն"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('username', 'required')}"
                        name="r_mail"
                      />
                    </float-label>
                    <div v-if="isInvalidField('username', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                  </div>
                  <div class="col-md-12 padding-b-20">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        :placeholder="$t('home.subscribe-area.placeholder')"
                        id="email"
                        v-model="$v.fields.email.$model"
                        type="email"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('email', 'required') || isInvalidField('email', 'email')}"
                        name="r_mail"
                      />
                    </float-label>  
                    <div v-if="isInvalidField('email', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    <div v-if="isInvalidField('email', 'email')" class="small text-danger">{{ $t('state_customer.valid_2') }}</div>
                  </div>
                  <div class="col-md-12 padding-b-20">
                      <float-label :dispatch="false" class="w-100">
                        <the-mask
                          id="phone"
                          v-model="$v.fields.phone.$model"
                          :validCharactersOnly="true"
                          class="auth-input mb-0"
                          :placeholder="$t('state_customer.pl_tel')"
                          :class="{'border-danger': isInvalidField('phone', 'required') || isInvalidPhone}"
                          mask="+(374) ##-##-##-##" 
                          name="r_phone"
                          @validate="validatePhone"
                        />
                      </float-label> 
                    <div v-if="isInvalidField('phone', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    <div v-else-if="isInvalidPhone" class="small text-danger">{{ $t('state_customer.valid_3') }}</div>
                  </div>
                </div>

                <!-- Companny / Company RU -->
                <div v-if="type === 'legalEntity'">
                  <div class="form-row align-items-end">
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          :disabled="$v.fields.name.hy.$model"
                          v-if="isPrivate"
                          v-model="$v.fields.name.hy.$model"
                          :placeholder="$t('private_customer.user_name')"
                          type="text"
                          name="company_name"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('name.hy', 'required')}"
                        />
                        <input
                          :disabled="$v.fields.name.hy.$model"
                          v-else
                          v-model="$v.fields.name.hy.$model"
                          :placeholder="$t('state_customer.pl_name')"
                          type="text"
                          name="company_name"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('name.hy', 'required')}"
                        />
                      </float-label>   
                      <div v-if="isInvalidField('name.hy', 'required')"
                        class="small text-danger">{{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          :disabled="$v.fields.name.ru.$model"
                          v-if="isPrivate"
                          id="name-ru"
                          v-model="$v.fields.name.ru.$model"
                          type="text"
                          name="company_name_ru"
                          :placeholder="$t('private_customer.user_name_ru')"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('name.ru', 'required')}"
                        />
                        <input
                          :placeholder="$t('private_customer.user_name_ru')"
                          :disabled="$v.fields.name.ru.$model"
                          v-else
                          id="name-ru"
                          v-model="$v.fields.name.ru.$model"
                          type="text"
                          name="company_name_ru"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('name.ru', 'required')}"
                        />
                      </float-label>    
                      <div v-if="isInvalidField('name.ru', 'required')"
                        class="small text-danger">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>

                  <div class="form-row align-items-end">
                    <div class="col-md-6 mb-3">
                      <label>Կազմակերպության տեսակը</label>
                      <select
                        :disabled="$v.fields.company_type.hy.$model"
                        v-if="isPrivate"
                        id="company-type"
                        v-model="$v.fields.company_type.hy.$model"
                        name="company_type"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('company_type.hy', 'required')}"
                      >
                        <option value="" disabled>Ընտրել տեսակ</option>
                        <option value="ՍՊԸ">ՍՊԸ</option>
                        <option value="Ա/Ձ">Ա/Ձ</option>
                        <option value="ԲԲԸ">ԲԲԸ</option>
                        <option value="Ա/Կ">Ա/Կ</option>
                        <option value="ՓԲԸ">ՓԲԸ</option>
                        <option value="Հիմնադրամ">Հիմնադրամ</option>
                        <option value="Հ/Կ">Հ/Կ</option>
                        <option value="Կոմիտե">Կոմիտե</option>
                        <option value="other">Այլ</option>
                      </select>
                      <select
                        v-else
                        :disabled="$v.fields.company_type.hy.$model"
                        id="company-type"
                        v-model="$v.fields.company_type.hy.$model"
                        name="company_type"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('company_type.hy', 'required')}"
                      >
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
                      <div v-if="isInvalidField('company_type.hy', 'required')"
                        class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Կազմակերպության տեսակը ռուսերեն</label>
                      <select
                        :disabled="$v.fields.company_type.ru.$model"
                        v-if="isPrivate"
                        id="company-type-ru"
                        v-model="$v.fields.company_type.ru.$model"
                        name="company_type_ru"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('company_type.ru', 'required')}"
                      >
                        <option value="" disabled>Выбрать</option>
                        <option value="ООО">ООО</option>
                        <option value="И/П">И/П</option>
                        <option value="ОАО">ОАО</option>
                        <option value="П/О">П/О</option>
                        <option value="К/О">К/О</option>
                        <option value="ЗАО">ЗАО</option>
                        <option value="ФОНД">ФОНД</option>
                        <option value="O/О">O/О</option>
                      </select>
                      <select
                        v-else
                        :disabled="$v.fields.company_type.ru.$model"
                        id="company-type-ru"
                        v-model="$v.fields.company_type.ru.$model"
                        name="company_type_ru"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('company_type.ru', 'required')}"
                      >
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
                      <div v-if="isInvalidField('company_type.ru', 'required')"
                        class="small text-danger">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- User Name -->
                <div v-else>
                  <div class="form-row align-items-end">
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          :disabled="$v.fields.name.hy.$model"
                          v-model="$v.fields.name.hy.$model"
                          :placeholder="$t('private_customer.user_name_surname')"
                          type="text"
                          name="company_name"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('name.hy', 'required')}"
                        />
                      </float-label>
                      <div v-if="isInvalidField('name.hy', 'required')"
                        class="small text-danger">{{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          :placeholder="$t('private_customer.user_name_surname_ru')"
                          :disabled="$v.fields.name.ru.$model"
                          v-model="$v.fields.name.ru.$model"
                          type="text"
                          name="company_name_ru"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('name.ru', 'required')}"
                        />
                      </float-label>
                      <div v-if="isInvalidField('name.ru', 'required')"
                        class="small text-danger">{{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Address HY -->
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        :placeholder="$t('state_customer.pl_state')"
                        v-model="$v.fields.region.hy.$model"
                        type="text"
                        name="company_region"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('region.hy', 'required')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('region.hy', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        v-model="$v.fields.region.ru.$model"
                        :placeholder="$t('state_customer.pl_state_rus')"
                        type="text"
                        name="company_region_ru"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('region.ru', 'required')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('region.ru', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        v-model="$v.fields.city.hy.$model"
                        :placeholder="$t('state_customer.pl_city')"
                        type="text"
                        name="company_city"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('city.hy', 'required')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('city.hy', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>  
                  <div class="col-md-6 mb-3">
                    <input
                      v-model="$v.fields.city.ru.$model"
                      :placeholder="$t('state_customer.pl_city_rus')"
                      type="text"
                      name="company_city_ru"
                      class="auth-input mb-0"
                      :class="{'border-danger': isInvalidField('city.ru', 'required')}"
                    />
                    <div v-if="isInvalidField('city.ru', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>  
                </div>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        v-model="$v.fields.address.hy.$model"
                        :placeholder="$t('state_customer.pl_address')"
                        type="text"
                        name="company_address"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('address.hy', 'required')}"
                      />
                    </float-label>  
                    <div v-if="isInvalidField('address.hy', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        v-model="$v.fields.address.ru.$model"
                        :placeholder="$t('state_customer.pl_address_rus')"
                        type="text"
                        name="company_address_ru"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('address.ru', 'required')}"
                      />
                    </float-label>    
                    <div v-if="isInvalidField('address.ru', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>

                <!-- Soc. Card / Passport Details -->
                <div v-if="type === 'person'">
                  <!-- Soc. Card Number / Passport Number -->
                  <div class="form-row">
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <the-mask
                          disabled
                          :placeholder="$t('private_customer.id_card_number')"
                          mask="###############################"
                          id="id_card_number"
                          v-model="$v.fields.id_card_number.$model"
                          type="text"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('id_card_number', 'required')}"
                          name="id_card_number"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('id_card_number', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <the-mask
                          :placeholder="$t('private_customer.passport.serial_number')"
                          disabled
                          mask="###############################"
                          id="passport_serial"
                          v-model="$v.fields.passport.serial_number.$model"
                          type="text"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('passport.serial_number', 'required')}"
                          name="passport_serial"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('passport.serial_number', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    </div>
                  </div>
                  <!-- Passport Details -->
                  <div class="form-row">
                    <div class="col-md-4 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          disabled
                          id="passport_start"
                          v-model="$v.fields.passport.given_at.$model"
                          type="text"
                          v-mask="'##/##/####'"
                          :placeholder="$t('private_customer.passport.given_at')"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('passport.given_at', 'required')}"
                          name="passport_start"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('passport.given_at', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                      <div v-if="isInvalidField('passport.given_at', 'validDate')" class="small text-danger">{{ $t('private_customer.valid_phone') }}</div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          disabled
                          id="passport_end"
                          v-model="$v.fields.passport.valid_until.$model"
                          type="text"
                          v-mask="'##/##/####'"
                          :placeholder="$t('private_customer.passport.valid_until')"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('passport.valid_until', 'required')}"
                          name="passport_end"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('passport.valid_until', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                      <div v-if="isInvalidField('passport.valid_until', 'validDate')" class="small text-danger">{{ $t('private_customer.valid_phone') }}</div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <the-mask 
                          disabled
                          mask="###"
                          v-model="$v.fields.passport.from.$model"
                          id="passport_who"
                          :placeholder="$t('private_customer.passport.from')"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('passport.from', 'required')}"
                          name="passport_who"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('passport.from', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    </div>
                  </div>
                </div>

                <!-- Bank Details -->
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        id="bank-name"
                        v-model="$v.fields.bank_name.hy.$model"
                        :placeholder="isPrivate ? $t('private_customer.pl_bank') : $t('state_customer.pl_bank')"
                        type="text"
                        name="bank_name"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('bank_name.hy', 'required')}"
                      />
                    </float-label>  
                    <div v-if="isInvalidField('bank_name.hy', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        v-model="$v.fields.bank_name.ru.$model"
                        :placeholder="isPrivate ? $t('private_customer.pl_bank_rus') : $t('state_customer.pl_bank_rus')"
                        type="text"
                        name="bank_name_ru"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('bank_name.ru', 'required')}"
                      />
                    </float-label>  
                    <div v-if="isInvalidField('bank_name.ru', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>

                <!-- Bank Account Details -->
                <div v-if="type === 'legalEntity'">
                  <div class="form-row" >
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <the-mask 
                          id="bank-account"
                          v-model="$v.fields.bank_account.$model"
                          :placeholder="$t('state_customer.pl_account_number')"
                          type="text"
                          min="0"
                          name="bank_account"
                          maxlength="16"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('bank_account', 'required')}"
                          mask="###############################"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('bank_account', 'required')"
                        class="small text-danger">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          disabled
                          id="tin"
                          v-model="$v.fields.tin.$model"
                          :placeholder="$t('state_customer.pl_hvhh')"
                          type="text"
                          name="hvhh"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('tin', 'required')}"
                          maxlength="8"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('tin', 'required')"
                        class="small text-danger">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-12 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          v-if="isPrivate"
                          id="director-name-hy"
                          v-model="$v.fields.director_name.hy.$model"
                          :placeholder="$t('private_customer.user_director')"
                          type="text"
                          name="director_name"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('director_name.hy', 'required')}"
                        />
                        <input
                          v-else
                          id="pl-name-hy"
                          v-model="$v.fields.director_name.hy.$model"
                          :placeholder="$t('state_customer.pl_name_surname')"
                          type="text"
                          name="director_name"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('director_name.hy', 'required')}"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('director_name.hy', 'required')"
                        class="small text-danger">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <float-label :dispatch="false" class="w-100">
                        <input
                          v-if="isPrivate"
                          id="director-name-ru"
                          v-model="$v.fields.director_name.ru.$model"
                          :placeholder="$t('private_customer.user_director_ru')"
                          type="text"
                          name="director_name"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('director_name.ru', 'required')}"
                        />
                        <input
                          v-else
                          id="director-name-ru"
                          v-model="$v.fields.director_name.ru.$model"
                          :placeholder="$t('state_customer.pl_name_surname_rus')"
                          type="text"
                          name="director_name_ru"
                          class="auth-input mb-0"
                          :class="{'border-danger': isInvalidField('director_name.ru', 'required')}"
                        />
                      </float-label>  
                      <div v-if="isInvalidField('director_name.ru', 'required')"
                        class="small text-danger">
                        {{ $t('state_customer.valid_1') }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bank Name -->
                <div class="form-row" v-if="type === 'person'">
                  <div class="col-md-12 mb-3">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        id="bank-account"
                        v-model="$v.fields.bank_account.$model"
                        :placeholder="$t('state_customer.pl_account_number')"
                        type="number"
                        min="0"
                        name="bank_account"
                        maxlength="16"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('bank_account', 'required')}"
                      />
                    </float-label>
                    <div v-if="isInvalidField('bank_account', 'required')"
                      class="small text-danger">
                      {{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>
              </form>
              <div class="d-flex justify-content-end">
                <button @click="save" type="button" class="button_H36" data-toggle="modal" data-animation="bounce">
                  <span>Պահպանել</span>
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { required, numeric, email } from 'vuelidate/lib/validators'
import moment from 'moment'
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
  name: 'userSettings',
  data () {
    return {
      isInvalidPhone: false,
      isPrivate: true,
      open: false,
      type: 'legalEntity',
      fields: {
        name: {
          hy: '',
          ru: '',
        },
        email: '',
        username: '',
        phone: '',
        tin: '',
        passport: {
          serial_number: '',
          given_at: '',
          from: '',
          valid_until: '',
        },
        id_card_number: '',
        bank_account: '',
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
        bank_name: {
          hy: '',
          ru: '',
        },
        director_name: {
          hy: '',
          ru: '',
        },
        company_type: {
          hy: '',
          ru: '',
        }
      },
      userType: this.$route.params.type,
    }
  },
  mounted(){
    if(this.me.organisation){
      if(this.me.organisation[0].passport_from){
        this.type = 'person'
        this.fields.passport.serial_number = this.me.organisation[0].passport_serial_number;
        this.fields.passport.given_at = this.me.organisation[0].passport_given_at;
        this.fields.passport.from = this.me.organisation[0].passport_from;
        this.fields.passport.valid_until = this.me.organisation[0].passport_valid_until;
        this.fields.id_card_number = this.me.organisation[0].id_card_number;
      }
      this.fields.name.hy = this.me.organisation[0].translations.name.hy;
      this.fields.name.ru = this.me.organisation[0].translations.name.ru;
      this.fields.email = this.me.email;
      this.fields.username = this.me.username;
      this.fields.phone = this.me.organisation[0].phone;
      this.fields.tin = this.me.organisation[0].tin;
      this.fields.bank_account = this.me.organisation[0].bank_account;
      this.fields.region.hy = this.me.organisation[0].translations.region.hy;
      this.fields.region.ru = this.me.organisation[0].translations.region.ru;
      this.fields.city.hy = this.me.organisation[0].translations.city.hy;
      this.fields.city.ru = this.me.organisation[0].translations.city.ru;
      this.fields.address.hy = this.me.organisation[0].translations.address.hy;
      this.fields.address.ru = this.me.organisation[0].translations.address.ru;
      this.fields.bank_name.hy = this.me.organisation[0].translations.bank_name.hy;
      this.fields.bank_name.ru = this.me.organisation[0].translations.bank_name.ru;
      this.fields.director_name.hy = this.me.organisation[0].translations.director_name.hy;
      this.fields.director_name.ru = this.me.organisation[0].translations.director_name.ru;
      this.fields.company_type.hy = this.me.organisation[0].translations.company_type.hy;
      this.fields.company_type.ru = this.me.organisation[0].translations.company_type.ru;
    }
  },
  watch: {
    me(newValue, oldValue) {
      if(newValue.organisation[0].passport_from){
        this.type = 'person'
        this.fields.passport.serial_number = newValue.organisation[0].passport_serial_number;
        this.fields.passport.given_at = newValue.organisation[0].passport_given_at;
        this.fields.passport.from = newValue.organisation[0].passport_from;
        this.fields.passport.valid_until = newValue.organisation[0].passport_valid_until;
        this.fields.id_card_number = newValue.organisation[0].id_card_number;
      }
      this.fields.name.hy = newValue.organisation[0].translations.name.hy;
      this.fields.name.ru = newValue.organisation[0].translations.name.ru;
      this.fields.email = newValue.email;
      this.fields.username = newValue.username;
      this.fields.phone = newValue.organisation[0].phone;
      this.fields.tin = newValue.organisation[0].tin;
      this.fields.bank_account = newValue.organisation[0].bank_account;
      this.fields.region.hy = newValue.organisation[0].translations.region.hy;
      this.fields.region.ru = newValue.organisation[0].translations.region.ru;
      this.fields.city.hy = newValue.organisation[0].translations.city.hy;
      this.fields.city.ru = newValue.organisation[0].translations.city.ru;
      this.fields.address.hy = newValue.organisation[0].translations.address.hy;
      this.fields.address.ru = newValue.organisation[0].translations.address.ru;
      this.fields.bank_name.hy = newValue.organisation[0].translations.bank_name.hy;
      this.fields.bank_name.ru = newValue.organisation[0].translations.bank_name.ru;
      this.fields.director_name.hy = newValue.organisation[0].translations.director_name.hy;
      this.fields.director_name.ru = newValue.organisation[0].translations.director_name.ru;
      this.fields.company_type.hy = newValue.organisation[0].translations.company_type.hy;
      this.fields.company_type.ru = newValue.organisation[0].translations.company_type.ru;
    },
  },
  computed: {
    isCoordinator(){
       return +this.me.divisions === 2
    },
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    consoleLog(e){
      console.log(e)
    },
    validatePhone(item) {
      const valid = item.valid;
      if (valid !== undefined){
        this.$v.fields.phone.$model = item.number;
        if(!item.valid){
          this.isInvalidPhone = true;
        }
        else{
          this.isInvalidPhone = false;
        }
      }
    },
    save() {
      // if(this.fields.email === this.me.email){
      //   delete this.fields.email;
      // }
      if(!this.$v.fields.$invalid && !this.isInvalidPhone) {
        $client.put(`private-user`, this.fields).then(({data}) => {
          if(data){
            this.$notify({
              group: 'foo',
              type: 'success',
              text: 'Հաջողությամբ պահպանված է'
            })
          }
        }).catch(e => {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Մուտքանունը զբաղված է',
            text: 'Կրկին փորձեք!'
          })
        })
      } else {
        this.$v.fields.$touch()
        this.$v.agreeToTerms.$touch()
        this.$v.captcha.$touch()
      }
    },
    isInvalidField (pathToField, validator) {
      const keyArr = pathToField.split('.')
      const field = keyArr.reduce((acc, key) => {
        return acc[key]
      }, this.$v.fields)
      return validator === 'required' ?
        field.$dirty && !field.required :
        field.required && !field[validator]
    }
  },
  validations() {
    const validationRules = {
      fields: {
        name: {
          hy: { required },
          ru: { required },
        },
        phone: { required },
        bank_account: { required, numeric },
        email: { required, email },
        username: { required },
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
        bank_name: {
          hy: { required },
          ru: { required },
        },
      },
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
      validationRules.fields = Object.assign(validationRules.fields, privateValidationRules);
      return validationRules;
    } else {
      const privateValidationRules = {
        company_type: {
          hy: { required },
          ru: { required },
        },
        director_name: {
          hy: { required },
          ru: { required },
        },
        tin: { required, numeric },
      }
      validationRules.fields = Object.assign(validationRules.fields, privateValidationRules);
      return validationRules;
    }
  }
}
</script>
<style scoped>
.card{
  margin-bottom: 12px;
}
</style>