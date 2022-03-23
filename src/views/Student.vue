<template>
  <div>
    <div class="card shadow filter-container">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div class="title font-weight-bold">
          FILTER
        </div>
      </div>
      <div class="card-body filter-body">
        <div class="filter-input">
          <div class="filter-label">
            <span>FISH</span>
            <button
              v-if="this.filter.first_name"
              class="clear-date"
              @click="clearDate('first_name')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <input
            v-model="filter.first_name"
            type="text"
            class="form-control form-control-sm"
            @input="loadStudents()"
          />
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>TELEFON</span>
            <button
              v-if="this.filter.phone"
              class="clear-date"
              @click="clearDate('phone')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <input
            v-model="filter.phone"
            type="tel"
            class="form-control form-control-sm"
            @input="loadStudents()"
          />
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>TUMAN</span>
            <button
              v-if="this.filter.region_id"
              class="clear-date"
              @click="clearDate('region_id')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <multiselect
            v-model="filter.region_id"
            class="table-select"
            :options="regions"
            :custom-label="nameWithLang"
            placeholder="Tanlash"
            label="name"
            select-label=""
            deselect-label="O'chirish"
            selected-label=""
            @input="loadStudents()"
          ></multiselect>
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>MANZIL</span>
            <button
              v-if="this.filter.address"
              class="clear-date"
              @click="clearDate('address')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <input
            v-model="filter.address"
            type="text"
            class="form-control form-control-sm"
            @input="loadStudents()"
          />
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>D.Y. TUMAN</span>
            <button
              v-if="this.filter.permanent_region_id"
              class="clear-date"
              @click="clearDate('permanent_region_id')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <multiselect
            v-model="filter.permanent_region_id"
            class="table-select"
            :options="regions"
            placeholder="Tanlash"
            label="name"
            select-label=""
            deselect-label="O'chirish"
            selected-label=""
            @input="loadStudents()"
          ></multiselect>
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>D.Y. MANZIL</span>
            <button
              v-if="this.filter.permanent_address"
              class="clear-date"
              @click="clearDate('permanent_address')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <input
            v-model="filter.permanent_address"
            type="text"
            class="form-control form-control-sm"
            @input="loadStudents()"
          />
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>JINSI</span>
            <button
              v-if="this.filter.gender"
              class="clear-date"
              @click="clearDate('gender')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <select
            v-model="filter.gender"
            class="form-control-sm form-control"
            @change="loadStudents()"
          >
            <option
              value=""
              selected
            >
              Tanlash
            </option>
            <option value="1">
              Erkak
            </option>
            <option value="2">
              Ayol
            </option>
          </select>
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>TUG'ILGAN SANA </span>
            <button
              v-if="this.filter.birthday"
              class="clear-date"
              @click="clearDate('birthday')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <div class="td-flex">
            <input
              v-model="filter.birthday"
              type="date"
              class="form-control form-control-sm"
              @input="loadStudents()"
            />
          </div>
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>CHEGIRMA</span>
            <button
              v-if="this.filter.discount"
              class="clear-date"
              @click="clearDate('discount')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <select
            v-model="filter.discount"
            class="form-control-sm form-control"
            @change="loadStudents()"
          >
            <option
              value=""
              selected
            >
              Tanlash
            </option>
            <option value="1">
              Ha
            </option>
            <option value="0">
              Yo'q
            </option>
          </select>
        </div>
        <div class="filter-input">
          <div class="filter-label">
            <span>CHEGIRMA SABABI</span>
            <button
              v-if="this.filter.discount_text"
              class="clear-date"
              @click="clearDate('discount_text')"
            >
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                />
              </svg>
            </button>
          </div>
          <input
            v-model="filter.discount_text"
            type="text"
            class="form-control form-control-sm"
            @input="loadStudents()"
          />
        </div>
        <div class="bottom-menu">
          <div class="page-mode">
            <select
              v-model="limit"
              class="form-control-sm form-control"
            >
              <option value="10">
                10
              </option>
              <option value="20">
                20
              </option>
              <option value="50">
                50
              </option>
              <option value="100">
                100
              </option>
              <option value="-1">
                Barchasi
              </option>
            </select>
          </div>
          <div
            v-if="limit != -1"
            class="pagination"
          >
            <BPagination
              v-model="page"
              :total-rows="totalPages"
              :per-page="limit"
              first-number
              last-number
            />
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div class="title font-weight-bold">
          TALABALAR <span
            class="text-primary ml-1"
            style="font-size: 20px"
          >( {{ this.totalPages }} ta )</span>
        </div>
        <span>
          <button
            class="btn btn-sm btn-primary"
            @click="openModal(false)"
          >Qo'shish</button>
          <button
            class="btn btn-sm btn-danger"
            data-toggle="tooltip"
            title="Guruhlar ro'yxatidan chiqarilgan talabalarni tozalash"
          >
            <feather-icon icon="TrashIcon" />
          </button>
        </span>
      </div>
      <div class="card-body">
        <div class="table-re bsponsive">
          <table
            id="dtHorizontalExample"
            class="table table-striped table-bordered table-sm text-center"
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th></th>
                <th>Rasm</th>
                <th>FISH</th>
                <th style="min-width: 200px">
                  Telefon
                </th>
                <th>Tuman</th>
                <th>Manzil</th>
                <th>D.y. tuman</th>
                <th>D.y. manzil</th>
                <th>Jinsi</th>
                <th>Tug'ilgan sana</th>
                <th>Chegirma</th>
                <th>Chegirma sababi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(student, index) in students"
                :key="student + '-' + index"
              >
                <td>
                  <div class="btn-group btn-group-vertical btn-group-sm">
                    <button
                      style="width: 60px; margin-bottom: 5px; border-radius: 4px"
                      class="btn  btn-outline-primary mt-2"
                      @click="openModal(student)"
                    >
                      <feather-icon icon="EditIcon" />
                    </button>
                    <button
                      style="width: 60px; margin-bottom: 5px; border-radius: 4px"
                      class="btn btn-outline-danger"
                      @click="deleteStudent(student.id)"
                    >
                      <feather-icon icon="TrashIcon" />
                    </button>
                    <button
                      style="width: 60px; border-radius: 4px"
                      class="btn btn-outline-info mb-2"
                      @click="openUserImage(student)"
                    >
                      <feather-icon icon="ImageIcon" />
                    </button>
                  </div>
                </td>
                <td>
                  <img
                    class="img-user"
                    :src="student.photo ? 'storage/' + student.photo : require(`@/assets/images/user-image.png`)"
                    alt="Avatar"
                  />
                </td>
                <td>
                  {{
                    `${student.first_name ? student.first_name : ''} ${student.last_name ? student.last_name : ''} ${
                      student.middle_name ? student.middle_name : ''
                    }`
                  }}
                </td>
                <td>{{ student.phone }}</td>
                <td>{{ student.region_id ? student.region.name : '-' }}</td>
                <td>{{ student.address }}</td>
                <td>{{ student.permanent_region_id ? student.permanent_region.name : '-' }}</td>
                <td>{{ student.permanent_address }}</td>
                <td>{{ genderLogic(student.gender) }}</td>
                <td>{{ student.birth_date ? formatDate(student.birth_date) : '-' }}</td>
                <td>{{ student.sale ? 'Ha' : "Yo'q" }}</td>
                <td>{{ student.sale_cause }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <b-modal
      ref="my-photo-modal"
      title="Talabani suratini yuklash"
      @hidden="stopWebCamera"
    >
      <div class="image-center">
        <div
          v-show="cameraShow"
          class="camera"
        >
          <video
            v-show="visibleCamera"
            ref="video"
            width="400"
            height="300"
            autoplay
          ></video>
          <canvas
            v-show="!visibleCamera"
            ref="canvas"
          ></canvas>
        </div>
        <img
          v-if="!cameraShow"
          v-show="this.url"
          class="user-src"
          :src="this.url"
          alt="Avatar"
        />
        <button
          v-show="selectedAvatar && !cameraShow"
          class="btn btn-danger delete-image"
          @click="deleteImage"
        >
          <feather-icon icon="TrashIcon" />
        </button>
      </div>
      <div class="webcam-buttons">
        <button
          v-show="!visibleCamera"
          class="btn btn-warning"
          @click="reCapture"
        >
          Qayta olish
        </button>
        <button
          v-if="cameraShow"
          v-show="visibleCamera"
          class="btn btn-success"
          @click="capturePhoto"
        >
          Suratga olish
        </button>
        <button
          v-if="!cameraShow"
          v-show="visibleCamera"
          class="btn btn-success"
          @click="startWebCamera"
        >
          Suratga olish bo'limi
        </button>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          hidden
          @click="fileUpload"
          @change="fileUpload"
        />
        <label
          v-show="visibleCamera"
          class="btn btn-outline-info"
          for="fileUpload"
        >
          Tanlash
        </label>
      </div>
      <template #modal-footer="{}">
        <b-button @click="stopWebCamera">
          <feather-icon icon="DeleteIcon" />
        </b-button>
        <b-button
          variant="primary"
          @click="submitPhoto"
        >
          Tasdiqlash
        </b-button>
      </template>
    </b-modal>

    <b-modal
      id="modal-prevent-closing"
      ref="my-modal"
      size="lg"
      title="Talaba qo'shish"
      cancel-title="Bekor qilish"
      ok-title="Tasdiqlash"
      @ok="submitForm"
      @hidden="resetForm"
    >
      <form
        @submit="submitForm"
        @keydown.enter="submitForm"
      >
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Ism <i class="text-danger">*</i></label>
              <input
                v-model="form.first_name"
                type="text"
                placeholder="Ism..."
                class="form-control"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Familiya <i class="text-danger">*</i></label>
              <input
                v-model="form.last_name"
                type="text"
                placeholder="Familiya..."
                class="form-control"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Sharifi</label>
              <input
                v-model="form.middle_name"
                type="text"
                placeholder="Sharifi..."
                class="form-control"
              />
            </div>
          </div>
          <div class="col-6">
            <label>Telefon</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span
                  id="basic-addon1"
                  class="input-group-text"
                >+998</span>
              </div>
              <input
                v-model="form.phone"
                type="number"
                :min="'000000001'"
                :max="'999999999'"
                :class="phone_mask"
                class="form-control"
                placeholder="Telefon..."
              />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group form-date-button">
              <label>Tug'ilgan kun</label>
              <input
                v-model="form.birthday"
                type="date"
                placeholder="Tug'gilgan kun..."
                class="form-control"
              />
              <button
                v-if="form.birthday"
                class="clear-date"
                @click="clearDate('birthday')"
              >
                <svg
                  height="512pt"
                  viewBox="0 0 512 512"
                  width="512pt"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Tuman</label>
              <multiselect
                v-model="form.region_id"
                class="modal-select"
                :options="regions"
                placeholder="Tanlash"
                label="name"
                select-label=""
                deselect-label="O'chirish"
                selected-label=""
              ></multiselect>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>D.y. Tuman</label>
              <multiselect
                v-model="form.permanent_region_id"
                class="modal-select"
                :options="regions"
                placeholder="Tanlash"
                label="name"
                select-label=""
                deselect-label="O'chirish"
                selected-label=""
              ></multiselect>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Manzil</label>
              <input
                v-model="form.address"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>D.y. manzili</label>
              <input
                v-model="form.permanent_address"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Jinsi <i class="text-danger">*</i></label>
          <div class="form-check">
            <input
              id="radio-male"
              v-model="form.gender"
              type="radio"
              class="form-check-input"
              name="gender"
              :value="1"
            />
            <label
              class="form-check-label font-weight-normal"
              for="radio-male"
            >Erkak</label>
          </div>
          <div class="form-check">
            <input
              id="radio-female"
              v-model="form.gender"
              type="radio"
              class="form-check-input"
              name="gender"
              :value="2"
            />
            <label
              class="form-check-label font-weight-normal"
              for="radio-female"
            >Ayol</label>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input
              id="radio_2086394"
              v-model="form.discount"
              type="checkbox"
              class="form-check-input"
              name="discount"
            />
            <label
              class="form-check-label"
              for="radio_2086394"
            >Chegirma</label>
          </div>
        </div>
        <div
          v-if="form.discount"
          class="form-group"
        >
          <label>Chegirma sababi</label>
          <textarea
            v-model="form.discount_text"
            class="form-control"
            :required="form.discount"
          ></textarea>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
$(document).ready(() => {
  $('#dtHorizontalExample').DataTable({
    scrollX: true,
  })
  $('.dataTables_length').addClass('bs-select')
})
</script>

<script>
import Multiselect from 'vue-multiselect'
import { get, post, del, put } from '@/helpers/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { BModal, BButton, BPagination } from 'bootstrap-vue'
import moment from 'moment'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'students',
  components: {
    BModal,
    BButton,
    BPagination,
    Multiselect,
  },
  data() {
    return {
      students: [],
      regions: [],
      storage: [],
      phone_mask: null,
      file: null,
      form: {
        id: null,
        discount: false,
        discount_text: null,
        first_name: null,
        last_name: null,
        middle_name: null,
        phone: null,
        birthday: null,
        region_id: null,
        address: null,
        permanent_region_id: null,
        permanent_address: null,
        gender: null,
      },
      filter: {
        first_name: null,
        phone: null,
        status: null,
        region_id: null,
        address: null,
        permanent_region_id: null,
        permanent_address: null,
        gender: null,
        birthday: null,
        discount: null,
        discount_text: null,
      },
      camera: null,
      canvas: null,
      avatar: null,
      cameraShow: false,
      visibleCamera: true,
      studentInfo: null,
      page: 1,
      totalPages: null,
      limit: 10,
      url: null,
      selectedAvatar: false,
    }
  },
  created() {
    this.loadStudents()
    this.loadRegions()
  },
  methods: {
    nameWithLang({ name }) {
      return `${name}`
    },
    clearDate(input) {
      if (input === 'birthday') {
        this.form.birthday = null
        this.filter.birthday = null
        this.loadStudents()
      } else {
        this.filter[input] = null
        this.loadStudents()
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    fileUpload(e) {
      this.hideCamera()
      this.cameraShow = false
      this.camera = null
      this.canvas = null
      this.visibleCamera = true

      let file = e.target.files[0]
      this.getBase64(file).then(data => ((this.avatar = data), (this.url = URL.createObjectURL(file))))
    },
    hideCamera() {
      if (this.camera ? this.camera.srcObject.getTracks()[0] : false) {
        this.camera.srcObject.getTracks()[0].stop()
      }
      if (this.camera ? this.camera.srcObject.getTracks()[1] : false) {
        this.camera.srcObject.getTracks()[1].stop()
      }
    },
    openUserImage(student) {
      this.studentInfo = student
      this.$refs['my-photo-modal'].show()
      if (student.photo) {
        this.url = 'storage/' + student.photo
        this.selectedAvatar = true
      } else {
        this.url = require(`@/assets/images/user-image.png`)
        this.selectedAvatar = false
      }
    },
    startWebCamera() {
      this.cameraShow = true
      const modalShow = new Promise(resolve => {
        this.$refs['my-photo-modal'].show()
        resolve()
      })

      modalShow.then(res => {
        this.camera = this.$refs['video']

        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(stream => {
              this.camera.srcObject = stream
            })
            .catch(error => {
              console.log('Something went wrong!', error)
            })
        }
      })
    },
    stopWebCamera() {
      this.$refs['my-photo-modal'].hide()

      this.hideCamera()

      this.url = null
      this.cameraShow = false
      this.camera = null
      this.canvas = null
      this.avatar = null
      this.visibleCamera = true
      this.studentInfo = null
      this.selectedAvatar = false
    },
    capturePhoto() {
      let canvas = this.$refs['canvas']

      canvas.width = 400
      canvas.height = 300
      canvas.getContext('2d').drawImage(this.camera, 0, 0, 400, 300)
      this.avatar = canvas.toDataURL('image/png')

      if (canvas.width) {
        this.visibleCamera = false
        this.hideCamera()
      }
    },
    reCapture() {
      this.visibleCamera = true
      this.avatar = null
      this.camera = this.$refs['video']

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(stream => {
            this.camera.srcObject = stream
          })
          .catch(error => {
            console.log('Something went wrong!', error)
          })
      }
    },
    submitPhoto() {
      if (this.studentInfo && this.avatar) {
        put('/students/' + this.studentInfo.id, {
          first_name: this.studentInfo.first_name,
          image: this.avatar ? this.avatar : null,
        }).then(res => {
          if (res.data.success) {
            this.stopWebCamera()
            this.loadStudents((this.page - 1) * this.limit)
            this.nofity('Success', 'Muvaffaqiyatli', 'success')
          }
        })
      } else if (!this.avatar) {
        this.stopWebCamera()
        this.loadStudents((this.page - 1) * this.limit)
        this.nofity('Success', 'Muvaffaqiyatli', 'success')
      } else {
        this.nofity('Xato', 'Suratga olinmadi!', 'danger')
      }
    },
    deleteImage() {
      put('/students/' + this.studentInfo.id, {
        first_name: this.studentInfo.first_name,
        photo: null,
      }).then(response => {
        if (response.data.success) {
          this.nofity('Success', 'Muvaffaqiyatli', 'success')
          this.url = require(`@/assets/images/user-image.png`)
          this.$refs['my-modal'].hide()
          this.selectedAvatar = false
          this.avatar = null
        }
      })
    },
    deleteStudent(id) {
      this.$bvModal
        .msgBoxConfirm("O'chirishga aminmisiz?", {
          cancelVariant: 'outline-secondary',
          okTitle: 'Tasdiqlash',
          cancelTitle: 'Bekor qilish',
        })
        .then(value => {
          if (value == true) {
            del('/students/' + id).then(response => {
              if (response.data.success) {
                this.nofity('Success', 'Muvaffaqiyatli', 'success')
                this.loadStudents((this.page - 1) * this.limit)
              }
            })
          }
        })
    },
    formatDate(value) {
      return moment(value).format('DD.MM.Y')
    },
    nofity(title, text, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          icon: 'BellIcon',
          text,
          variant,
        },
      })
    },
    loadRegions() {
      get('/regions').then(response => {
        if (response.data.success) {
          this.regions = response.data.data
        }
      })
    },
    loadStudents(skip = 0) {
      const query = {}

      if (this.filter.first_name) query.first_name = this.filter.first_name
      if (this.filter.phone) query.phone = this.filter.phone
      if (this.filter.status) query.status = this.filter.status
      if (this.filter.region_id) query.region_id = this.filter.region_id.id
      if (this.filter.address) query.address = this.filter.address
      if (this.filter.permanent_region_id) query.permanent_region_id = this.filter.permanent_region_id.id
      if (this.filter.permanent_address) query.permanent_address = this.filter.permanent_address
      if (this.filter.gender) query.gender = this.filter.gender
      if (this.filter.birthday) query.birth_date = this.filter.birthday
      if (this.filter.discount) query.sale = this.filter.discount
      if (this.filter.discount_text) query.sale_cause = this.filter.discount_text

      const queryString = Object.keys(query)
        .map(key => key + '=' + query[key])
        .join('&')

      get(`/students?${queryString}&limit=${this.limit}&skip=${skip}`).then(response => {
        if (response.data.success) {
          this.students = response.data.data
          this.totalPages = response.data.total
        }
      })
    },
    genderLogic(gender) {
      if (gender === 1) {
        return 'Erkak'
      } else if (gender === 2) {
        return 'Ayol'
      } else {
        return '-'
      }
    },
    openModal(student = false) {
      this.$refs['my-modal'].show()

      if (student) {
        this.form.id = student.id
        this.form.discount = student.sale
        this.form.discount_text = student.sale_cause
        this.form.first_name = student.first_name
        this.form.last_name = student.last_name
        this.form.middle_name = student.middle_name
        this.form.phone = student.phone ? student.phone.trim().replaceAll(' ', '') : ''
        this.form.birthday = student.birth_date ? moment(student.birth_date).format('Y-MM-DD') : null
        this.form.region_id = student.region
        this.form.address = student.address
        this.form.permanent_region_id = student.permanent_region
        this.form.permanent_address = student.permanent_address
        this.form.gender = student.gender
      }
    },
    submitForm(e) {
      e.preventDefault()

      if (!this.form.first_name && !this.form.last_name && !this.form.gender) {
        this.nofity('Xato', "Hamma majburiy qatorni to'ldiring", 'danger')
      }

      if (!this.form.id) {
        post('/students', {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          middle_name: this.form.middle_name,
          phone: this.form.phone,
          birth_date: this.form.birthday,
          status: 1,
          gender: this.form.gender,
          sale: this.form.discount,
          sale_cause: this.form.discount_text,
          region_id: this.form.region_id ? this.form.region_id.id : null,
          address: this.form.address,
          permanent_region_id: this.form.permanent_region_id ? this.form.region_id.id : null,
          permanent_address: this.form.permanent_address,
        }).then(response => {
          if (response.data.success) {
            this.nofity('Success', 'Muvaffaqiyatli', 'success')
            this.resetForm()
            this.$refs['my-modal'].hide()
            this.loadStudents((this.page - 1) * this.limit)
          }
        })
      } else {
        put('/students/' + this.form.id, {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          middle_name: this.form.middle_name,
          phone: this.form.phone,
          birth_date: this.form.birthday,
          status: 1,
          gender: this.form.gender,
          sale: this.form.discount,
          sale_cause: this.form.discount_text,
          region_id: this.form.region_id ? this.form.region_id.id : null,
          address: this.form.address,
          permanent_region_id: this.form.permanent_region_id ? this.form.region_id.id : null,
          permanent_address: this.form.permanent_address,
        }).then(response => {
          if (response.data.success) {
            this.nofity('Success', 'Muvaffaqiyatli', 'success')
            this.resetForm()
            this.$refs['my-modal'].hide()
            this.loadStudents()
          }
        })
      }
    },
    resetForm(e) {
      this.form.discount = false
      this.form.discount_text = null
      this.form.first_name = null
      this.form.last_name = null
      this.form.middle_name = null
      this.form.phone = null
      this.form.birthday = null
      this.form.region_id = null
      this.form.address = null
      this.form.permanent_region_id = null
      this.form.permanent_address = null
      this.form.gender = null
    },
  },
  watch: {
    ['avatar']() {},
    ['form.phone']() {
      if ((this.form.phone && this.form.phone.length < 9) || this.form.phone.length > 9) {
        this.phone_mask = 'is-invalid'
      } else {
        this.phone_mask = null
      }
    },
    ['page']() {
      this.loadStudents((this.page - 1) * this.limit)
    },
    limit() {
      this.loadStudents()
    },
  },
}
</script>

<style>
.dtHorizontalExampleWrapper {
  max-width: 600px;
  margin: 0 auto;
}
#dtHorizontalExample th,
td {
  white-space: nowrap;
}

table.dataTable thead .sorting:after,
table.dataTable thead .sorting:before,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_asc:before,
table.dataTable thead .sorting_asc_disabled:after,
table.dataTable thead .sorting_asc_disabled:before,
table.dataTable thead .sorting_desc:after,
table.dataTable thead .sorting_desc:before,
table.dataTable thead .sorting_desc_disabled:after,
table.dataTable thead .sorting_desc_disabled:before {
  bottom: 0.5em;
}

label {
  font-weight: bold;
  text-transform: uppercase;
}
.image-center {
  position: relative !important;
  text-align: center;
}
.camera {
  text-align: center;
}

.camera video {
  border: 4px solid red;
  border-radius: 5px;
}
.camera canvas {
  border: 4px solid #00ea00;
  border-radius: 5px;
}
.webcam-buttons {
  margin-top: 20px;
  text-align: center;
}

.user-src {
  width: 400px;
  height: 300px;
  object-fit: cover;
}

label[for='fileUpload'] {
  margin-bottom: 0;
  text-transform: capitalize;
}

.delete-image {
  position: absolute;
  top: 10px;
  right: 40px;
  border: 3px solid #fff !important;
}
</style>
