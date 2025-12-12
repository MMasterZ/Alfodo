<template>
  <q-page class="row justify-center items-center  box-backdrop-main">
    <!-- #region Desktop -->
    <div
      class="background-main relative-position"
      v-if="systemStore.platform.desktop"
    >
      <!-- #region Background -->
      <background></background>
      <!-- #endregion -->

      <!-- #region Character -->
      <div class="absolute-center box-character-main">
       <character
          :isShop="true"
          :equipment="equipment"
          :isAnimation="true"
        ></character>
      </div>
      <!-- #endregion -->

      <!-- #region Box Item Shop -->
      <div class="absolute-top box-item-shop-main">
        <div
          class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s"
        >
          <q-img src="/images/box_main/box-shop-items.webp" no-spinner no-transition>
            <div class="absolute-bottom no-padding box-shop-main">
              <!-- #region Header Menu -->
              <div class="row full-width">
                <div
                  class="col button-header-item"
                  v-for="(item, index) in headerMenuList"
                  :key="index"
                  @click="funcSelectMenu(item.name)"
                >
                  <div align="center">
                    <q-img
                      style="width: 100%"
                      no-spinner
                      no-transition
                      :src="`/images/shop_main/button-menu-${item.name}${
                        selectedMenu == item.name ? '-selected' : ''
                      }.webp?${randomString}`"
                    ></q-img>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Box item list -->
              <div class="box-item-main relative-position">
                <!-- #region More Menu -->
                <div
                  class="absolute-top-left"
                  style="top: 2%; left: 1%; width: 14.284%"
                  v-if="selectedMenu == 'more'"
                >
                  <div class="relative-position" style="margin-bottom: 7%">
                    <q-img
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      @click="funcSelectMenu('pet')"
                      :src="`/images/button_main/button-shop-buddy-${
                        selectMenuType == 'pet' ? 'selected' : 'no-selected'
                      }.png?${randomString}`"
                    ></q-img>

                    <div
                      class="absolute-top-right"
                      style="width: 16.25%; top: -25%"
                      v-if="isNewItemPet"
                    >
                      <q-img
                        src="/images/icon_main/icon-item-alert-circle-red.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                  <div class="relative-position" style="margin-bottom: 7%">
                    <q-img
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      @click="funcSelectMenu('other')"
                      :src="`/images/button_main/button-shop-accessories-${
                        selectMenuType == 'other' ? 'selected' : 'no-selected'
                      }.png?${randomString}`"
                    ></q-img>

                    <div
                      class="absolute-top-right"
                      style="width: 16.25%; top: -25%"
                      v-if="isNewItemOther"
                    >
                      <q-img
                        src="/images/icon_main/icon-item-alert-circle-red.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Item list [head,body,footer,pet,other] -->
                <div class="relative-position box-item-list-main animate__animated animation-duration-0-5s" :class="{'animate__fadeInRight': selectedMenu != 'skin'}" v-if="selectedMenu != 'skin'">
                  <div
                    class="row box-item-scroll"
                    style="width: 100%; height: fit-content"
                  >
                    <div
                      class="col-4 box-items"
                      align="center"
                      @click="funcSelectItem(item)"
                      v-for="(item, index) in showItemList[currentItemPage - 1]"
                      :key="index"
                    >
                      <div
                        class="relative-position"
                        style="width: 96.78%; margin-bottom: 3%"
                      >
                        <q-img
                          class="relative-position"
                          :src="`/images/button_main/button-item-shop${
                            funcCheckSelectedItem(item) ? '-selected' : ''
                          }.png`"
                          no-spinner
                          no-transition
                        >
                        </q-img>

                        <div class="absolute-center fit">
                          <div class="fit transparent cursor-pointer" align="center">
                            <div
                              class="absolute-center items-img"
                              style="width: 79%; height: 50%; top: 34%"
                            >
                              <q-img
                                no-spinner
                                no-transition
                                width="70%"
                                class="absolute-center"
                                :src="`${item.image}?${randomString}`"
                              ></q-img>
                            </div>

                            <div
                              class="absolute-bottom text-item text-item-box"
                              style="width: 80%; height: 30%; bottom: 9%; margin: auto"
                            >
                              <div
                                class="relative-position fit row justify-center items-center"
                              >
                                <div
                                  class="absolute-center"
                                  style="width: 100%; top: 20%"
                                  align="left"
                                >
                                  <div class="text-overflow" align="left">
                                    <div class="text-item-name">
                                      {{ item.itemNameTh }}
                                    </div>
                                  </div>
                                </div>
                                <q-img
                                  src="/images/box_main/box-separator-line.png"
                                  no-spinner
                                  no-transition
                                ></q-img>
                                <div class="absolute-bottom row" v-if="!item.isHas">
                                  <div class="col-1 self-center" style="width: 16.31%">
                                    <q-img
                                      no-spinner
                                      no-transition
                                      width="100%"
                                      src="/images/icon_main/icon-coin-winner.png"
                                    ></q-img>
                                  </div>
                                  <div
                                    class="col self-center"
                                    align="left"
                                    style="padding: 0% 3%"
                                  >
                                    <span
                                      class="relative-position text-discount"
                                      v-if="item.discount > 0"
                                    >
                                      {{ item.fullPrice }}
                                      <div
                                        class="absolute-center full-width"
                                        style="
                                          top: 57%;
                                          height: 0.01cm;
                                          background-color: #d80000;
                                        "
                                      ></div>
                                    </span>
                                    <span
                                      class="relative-position"
                                      style="padding: 0% 5%"
                                    >
                                      {{ item.price }}
                                    </span>
                                  </div>
                                </div>
                                <div class="absolute-bottom" align="center" v-else>
                                  <div class="self-center">มีแล้ว</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ item.itemNameTh }}
                          </q-tooltip>
                        </div>

                        <div
                          class="absolute-top-right box-label-diff-day"
                          v-if="!item.isAlwaysOn && !item.isHas"
                        >
                          <div class="font-mali-b" align="center">
                            <div style="line-height: 1">
                              {{ funcFormatMinutes(item.diffInMinutes).total }}
                            </div>
                            <div
                              style="
                                line-height: 1.5;
                                font-size: clamp(4px, 0.435vw, 7px);
                              "
                            >
                              {{
                                `${
                                  funcFormatMinutes(item.diffInMinutes).isDays
                                    ? "Day"
                                    : "Hours"
                                }`
                              }}
                            </div>
                          </div>
                        </div>

                        <div
                          class="absolute-center"
                          style="width: 47.3%; top: 8%"
                          v-if="item.isNew && !item.isHas"
                        >
                          <q-img
                            no-spinner
                            no-transition
                            src="/images/icon_main/icon-new-items-shop-red.png"
                          >
                          </q-img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Skin -->
                <div
                  class="self-center row justify-center items-center fit animate__animated animation-duration-0-5s"
                  :class="{'animate__fadeInLeft': selectedMenu == 'skin'}"
                  align="center"
                  v-if="selectedMenu == 'skin'"
                >
                  <div class="relative-position box-color-skin">
                    <q-color
                      style="width: 75%"
                      v-model="equipment.color"
                      no-header
                      no-footer
                      flat
                      bordered
                      @change="funcChangeColor()"
                    />
                    <div class="row justify-center box-text-skin" align="center">
                      <div class="self-center">
                        <span class=" font-mali-r">
                          เปลี่ยนสีผิวตัวละคร ครั้งละ 1,000
                        </span>
                      </div>
                      <div class="self-center icon-cubic">
                        <q-img
                          no-spinner
                          no-transition
                          class="self-center"
                          src="/images/shop_main/icon-cubic.webp"
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Pagination -->
                <div
                  class="absolute-bottom box-pagination-main"
                  v-if="selectedMenu != 'skin'"
                  align="center"
                >
                  <div class="row justify-center relative-position animate__animated animate__fadeInUp animation-duration-0-5s">
                    <div class="col-1 box-pagination">
                      <q-img
                        src="/images/button_main/button-pagination-number.png"
                        no-spinner
                        no-transition
                        :class="currentItemPage == 1 ? '' : 'cursor-pointer'"
                        @click="currentItemPage == 1 ? null : currentItemPage--"
                      >
                        <div
                          class="absolute-center pagination-number row justify-center items-center no-padding"
                          :class="currentItemPage == 1 ? 'disable' : ''"
                        >
                          <div class="font-mali-b">
                            {{ `<` }}
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <div
                      class="col-1 box-pagination"
                      v-for="(pagination, indexPagination) in showPagination"
                      :key="indexPagination"
                    >
                      <q-img
                        src="/images/button_main/button-pagination-number.png"
                        no-spinner
                        no-transition
                        class="cursor-pointer"
                        @click="currentItemPage = pagination"
                      >
                        <div
                          class="absolute-center pagination-number row justify-center items-center no-padding"
                          :class="currentItemPage == pagination ? 'selected' : ''"
                        >
                          <div class="font-mali-b">
                            <div
                              v-if="
                                (showPagination[showPagination.length - 1] > 9 &&
                                  currentItemPage > 5 &&
                                  indexPagination == 1) ||
                                (showPagination[showPagination.length - 1] > 9 &&
                                  currentItemPage <
                                    showPagination[showPagination.length - 1] - 4 &&
                                  indexPagination == 7)
                              "
                            >
                              {{ `...` }}
                            </div>
                            <div v-else style="line-height: 1">
                              {{ `${pagination}` }}
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <div class="col-1 box-pagination">
                      <q-img
                        src="/images/button_main/button-pagination-number.png"
                        no-spinner
                        no-transition
                        :class="
                          currentItemPage == showPagination[showPagination.length - 1]
                            ? ''
                            : 'cursor-pointer'
                        "
                        @click="
                          currentItemPage == showPagination[showPagination.length - 1]
                            ? null
                            : currentItemPage++
                        "
                      >
                        <div
                          class="absolute-center pagination-number row justify-center items-center no-padding"
                          :class="
                            currentItemPage == showPagination[showPagination.length - 1]
                              ? 'disable'
                              : ''
                          "
                        >
                          <div class="font-mali-b">
                            {{ `>` }}
                          </div>
                        </div>
                      </q-img>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->
            </div>

            <div
              class="absolute-top no-padding row transparent"
              style="width: 92%; top: 19.5%; margin: auto"
            >
              <div
                class="col button-header-item"
                align="center"
                v-for="(item, index) in headerMenuList"
                :key="index"
              >
                <div style="width: 47.37%; top: 8%" v-if="item.isNew">
                  <q-img
                    no-spinner
                    no-transition
                    src="/images/icon_main/icon-new-items-shop-red.png"
                  >
                  </q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button And Total Price Bar -->
      <div class="absolute-bottom row box-total-price-bar">
        <div class="self-center button-reset">
          <q-img
            class="cursor-pointer"
            @click="funcGetCharacter()"
            src="/images/button_main/button-reset-equipment.png"
            no-spinner
            no-transition
          ></q-img>
        </div>

        <div class="self-center box-shop-price">
          <q-img src="/images/shop_main/box-total-price.webp" no-spinner no-transition>
            <div class="no-padding absolute-center fit transparent" style="top: 45%">
              <div class="absolute-center row justify-start" style="width:80%;" align="left">
                <div class="self-center text-overflow" align="left">
                  <span class="text-total-price">{{ `${totalPrice}` }} </span>
                </div>
              </div>
            </div>
          </q-img>
        </div>

        <div class="self-center button-cart">
          <q-img
            class="cursor-pointer"
            @click="funcCheckItem()"
            src="/images/shop_main/button-cart.webp"
            no-spinner
            no-transition
          >
          </q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Header Bar -->
      <div class="absolute-top-left box-header-bar">
        <div class="relative-position row">
          <!-- #region Button Out -->
          <div class="self-center button-back">
            <q-img
              @click="$router.replace('/lobby')"
              class="cursor-pointer"
              no-spinner
              no-transition
              src="/images/shop_main/button-back.webp"
            ></q-img>
          </div>
          <!-- #endregion -->

          <!-- #region Bar Coin -->
          <div class="self-center box-cubic-main">
            <q-img src="/images/shop_main/box-cubic.webp">
              <div class="no-padding fit row transparent">
                <div class="absolute-center box-total-cubic font-mali-b" align="center">
                  {{ studentStore.coin <= 99999 ? studentStore.coin : "+99,999" }}
                </div>
              </div>
            </q-img>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div
      class="fit absolute-center background-main mobile"
      v-if="systemStore.platform.mobile"
    >
      <div class="relative-position fit">
        <!-- #region Character  -->
        <div
          class="relative-position box-character-mobile animate__animated animate__fadeInLeft animation-duration-0-5s"
        >

        <div class="absolute-center background-mobile"></div>
          <div
            class="absolute-bottom"
            style="
              width: calc(65vh * 9 / 16);
              min-width: 200px;
              max-width:340px;
              bottom: 10px;
              margin: auto;
              overflow: hidden;
            "
          >
            <character
              :isAnimation="true"
              :isShop="true"
              :equipment="equipment"
            ></character>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Box Shop Item -->
        <div
          class="relative-position box-item-main mobile animate__animated animate__fadeInRight animation-duration-0-5s"
        >
          <!-- #region Header -->
          <div class="row relative-position">
            <div
              class="col relative-position"
              @click="funcSelectMenu(item.name)"
              align="center"
              v-for="(item, index) in headerMenuList"
              :key="index"
            >
              <div align="center">
                <q-img
                  style="width: 100%"
                  no-spinner
                  no-transition
                  :src="`/images/button_main/button-itemshop-menu-${item.name}${
                    selectedMenu == item.name ? '-selected' : ''
                  }-mobile.jpg?${randomString}`"
                ></q-img>
              </div>

              <div
                class="absolute-center"
                style="width: 45px; top: -2%"
                v-if="item.isNew"
              >
                <q-img
                  src="/images/icon_main/icon-new-items-shop-red.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>

            <div
              v-if="isShowSubMenu"
              class="absolute-top-right z-max"
              style="top: 60px; right: 15px"
            >
              <q-img
                no-spinner
                no-transition
                width="100px"
                src="/images/box_main/box-dialog-menu-shop-mobile.png"
              >
                <div
                  class="full-width absolute-center no-padding row justify-center items-center"
                  style="top: 55%; height: 80%"
                >
                  <div class="relative-position col-10 self-center">
                    <q-img
                      no-spinner
                      no-transition
                      width="100%"
                      :src="`/images/button_main/button-shop-buddy-${
                        selectMenuType == 'pet' ? 'selected' : 'no-selected'
                      }.png`"
                      @click="funcSelectMenu('pet')"
                    ></q-img>

                    <div
                      class="absolute-top-right"
                      style="width: 12px; top: -25%"
                      v-if="isNewItemPet"
                    >
                      <q-img
                        src="/images/icon_main/icon-item-alert-circle-red.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                  <div class="relative-position col-10 self-center">
                    <q-img
                      no-spinner
                      no-transition
                      width="100%"
                      :src="`/images/button_main/button-shop-accessories-${
                        selectMenuType == 'other' ? 'selected' : 'no-selected'
                      }.png`"
                      @click="funcSelectMenu('other')"
                    ></q-img>

                    <div
                      class="absolute-top-right"
                      style="width: 12px; top: -25%"
                      v-if="isNewItemOther"
                    >
                      <q-img
                        src="/images/icon_main/icon-item-alert-circle-red.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Item List -->
          <div
            class="relative-position box-shop-item-container mobile animate__fadeIn"
            v-if="selectedMenu != 'skin'"
          >
            <div
              class="col-12 row box-item-scroll"
              style="
                max-width: 400px;
                width: 85%;
                min-width: 300px;
                margin: auto;
                height: fit-content;
              "
            >
              <div
                class="col-4"
                align="center"
                @click="funcSelectItem(item)"
                v-for="(item, index) in showItemList[currentItemPage - 1]"
                :key="index"
              >
                <div class="relative-position" style="width: 96.78%; margin-bottom: 3%">
                  <q-img
                    class="relative-position"
                    :src="`/images/button_main/button-item-shop${
                      funcCheckSelectedItem(item) ? '-selected' : ''
                    }.png`"
                    no-spinner
                    no-transition
                  >
                  </q-img>

                  <div class="absolute-center fit">
                    <div class="fit transparent cursor-pointer" align="center">
                      <div
                        class="absolute-center items-img"
                        style="width: 79%; height: 50%; top: 34%"
                      >
                        <q-img
                          no-spinner
                          no-transition
                          width="70%"
                          class="absolute-center"
                          :src="`${item.image}?${randomString}`"
                        ></q-img>
                      </div>

                      <div
                        class="absolute-bottom text-item text-item-box"
                        style="width: 80%; height: 30%; bottom: 9%; margin: auto"
                      >
                        <div
                          class="relative-position fit row justify-center items-center"
                        >
                          <div
                            class="absolute-center"
                            style="width: 100%; top: 20%"
                            align="left"
                          >
                            <div class="text-overflow text-item-name" align="left">
                              {{ item.itemNameTh }}
                            </div>
                          </div>
                          <q-img
                            src="/images/box_main/box-separator-line.png"
                            no-spinner
                            no-transition
                          ></q-img>
                          <div class="absolute-bottom row" v-if="!item.isHas">
                            <div class="col-1 self-center" style="width: 16.31%">
                              <q-img
                                no-spinner
                                no-transition
                                width="100%"
                                src="/images/shop_main/icon-cubic.webp"
                              ></q-img>
                            </div>
                            <div
                              class="col self-center"
                              align="left"
                              style="padding: 0% 3%"
                            >
                              <span
                                class="relative-position text-discount"
                                v-if="item.discount > 0"
                              >
                                {{ item.fullPrice }}
                                <div
                                  class="absolute-center full-width"
                                  style="
                                    top: 57%;
                                    height: 0.01cm;
                                    background-color: #d80000;
                                  "
                                ></div>
                              </span>
                              <span class="relative-position" style="padding: 0% 5%">
                                {{ item.price }}
                              </span>
                            </div>
                          </div>
                          <div class="absolute-bottom" align="center" v-else>
                            <div class="self-center">มีแล้ว</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      {{ item.itemNameTh }}
                    </q-tooltip>
                  </div>

                  <div
                    class="absolute-top-right box-label-diff-day"
                    v-if="!item.isAlwaysOn && !item.isHas"
                  >
                    <div class="font-mali-b" align="center">
                      <div style="line-height: 1">
                        {{ funcFormatMinutes(item.diffInMinutes).total }}
                      </div>
                      <div style="line-height: 1.5; font-size: clamp(4px, 0.435vw, 7px)">
                        {{
                          `${
                            funcFormatMinutes(item.diffInMinutes).isDays ? "Day" : "Hours"
                          }`
                        }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="absolute-center"
                    style="width: 45.39px; top: 2%"
                    v-if="item.isNew && !item.isHas"
                  >
                    <q-img
                      no-spinner
                      no-transition
                      src="/images/icon_main/icon-new-items-shop-red.png"
                    >
                    </q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Skin -->
          <div
            class="relative-position animate__animated animate__fadeIn box-skin-container mobile"
            align="center"
            v-if="selectedMenu == 'skin'"
          >
            <div class="relative-position" align="center">
              <q-color
              style="width:170px;"
                v-model="equipment.color"
                no-header
                no-footer
                flat
                bordered
                @change="funcChangeColor()"
              />
            </div>
            <div class="row justify-center box-text-skin mobile" align="center">
              <div class="self-center">
                เปลี่ยนสีผิวตัวละคร ครั้งละ 1,000
              </div>
              <div class="self-center icon-cubic mobile">
                <q-img
                  no-spinner
                  no-transition
                  class="self-center"
                  src="/images/shop_main/icon-cubic.webp"
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Total Bar -->
          <div
            class="absolute-bottom row justify-center box-total-price-bar mobile"
            :style="selectedMenu == 'skin' ? 'bottom:10px;' : 'bottom:10%'"
            align="center"
          >
            <div class="self-center button-reset mobile">
              <q-img
                class="cursor-pointer"
                @click="funcGetCharacter()"
                src="/images/button_main/button-reset-equipment.png"
                no-spinner
                no-transition
              ></q-img>
            </div>

            <div class="self-center box-shop-price mobile">
              <q-img src="/images/shop_main/box-total-price.webp" no-spinner no-transition>
                <div class="no-padding absolute-center fit transparent" style="top: 45%">
                  <div class="absolute-center row justify-start" style="width:80%;" align="left">
                    <div class="self-center text-overflow" align="left">
                      <span class="text-total-price mobile">{{ `${totalPrice}` }} </span>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>

            <div class="self-center button-cart mobile">
              <q-img
                class="cursor-pointer"
                @click="funcCheckItem()"
                src="/images/shop_main/button-cart.webp"
                no-spinner
                no-transition
              >
              </q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Pagination -->
          <div class="absolute-bottom" style="width: 100%">
            <div
              class="relative-position animate__animated animation-duration-0-5s"
              :class="
                selectedMenu == 'skin' ? 'animate__fadeOutDown' : 'animate__fadeInUp'
              "
              v-if="selectedMenu != 'skin'"
            >
              <div class="box-pagination-container mobile row">
                <div class="col-1 box-pagination mobile">
                  <q-img
                    src="/images/button_main/button-pagination-number.png"
                    no-spinner
                    no-transition
                    :class="currentItemPage == 1 ? '' : 'cursor-pointer'"
                    @click="currentItemPage == 1 ? null : currentItemPage--"
                  >
                    <div
                      class="absolute-center pagination-number mobile row justify-center items-center no-padding"
                      :class="currentItemPage == 1 ? 'disable' : ''"
                    >
                      <div class="font-mali-b">
                        {{ `<` }}
                      </div>
                    </div>
                  </q-img>
                </div>
                <div
                  class="col-1 box-pagination mobile"
                  v-for="(pagination, indexPagination) in showPagination"
                  :key="indexPagination"
                >
                  <q-img
                    src="/images/button_main/button-pagination-number.png"
                    no-spinner
                    no-transition
                    class="cursor-pointer"
                    @click="currentItemPage = pagination"
                  >
                    <div
                      class="absolute-center pagination-number mobile row justify-center items-center no-padding"
                      :class="currentItemPage == pagination ? 'selected' : ''"
                    >
                      <div class="font-mali-b">
                        <div
                          v-if="
                            (showPagination[showPagination.length - 1] > 9 &&
                              currentItemPage > 5 &&
                              indexPagination == 1) ||
                            (showPagination[showPagination.length - 1] > 9 &&
                              currentItemPage <
                                showPagination[showPagination.length - 1] - 4 &&
                              indexPagination == 7)
                          "
                        >
                          {{ `...` }}
                        </div>
                        <div v-else style="line-height: 1">
                          {{ `${pagination}` }}
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
                <q-space></q-space>
                <div class="col-1 box-pagination mobile">
                  <q-img
                    src="/images/button_main/button-pagination-number.png"
                    no-spinner
                    no-transition
                    :class="
                      currentItemPage == showPagination[showPagination.length - 1]
                        ? ''
                        : 'cursor-pointer'
                    "
                    @click="
                      currentItemPage == showPagination[showPagination.length - 1]
                        ? null
                        : currentItemPage++
                    "
                  >
                    <div
                      class="absolute-center pagination-number mobile row justify-center items-center no-padding"
                      :class="
                        currentItemPage == showPagination[showPagination.length - 1]
                          ? 'disable'
                          : ''
                      "
                    >
                      <div class="font-mali-b">
                        {{ `>` }}
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->
      </div>

      <!-- #region Header Bar -->
      <div class="absolute-top-left box-header-bar mobile">
        <div class="relative-position row">
          <div class="button-back mobile" @click="$router.replace('/lobby')">
            <q-img
              class="cursor-pointer"
              no-spinner
              no-transition
              src="/images/shop_main/button-back.webp"
            ></q-img>
          </div>
          <div class="self-center box-cubic-main mobile">
            <q-img src="/images/shop_main/box-cubic.webp">
              <div class="no-padding fit row transparent">
                <div class="absolute-center box-total-cubic font-mali-b mobile" align="center">
                  {{ studentStore.coin <= 99999 ? studentStore.coin : "+99,999" }}
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Dialog Buy Item -->
    <q-dialog v-model="isShowDialogBuyItem" persistent maximized>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center no-padding">
          <div class="self-center relative-position box-dialog-buy-item-main" :class="{'mobile':isMobile}">
            <q-img
              src="/images/shop_main/box-buy-item.webp"
              no-transition
              no-spinner
            >
              <div class="fit transparent relative-position no-padding">
                <!-- #region Alert Not enough money -->
                <div
                  class="absolute-center full-width"
                  id="alert-not-enough-money"
                  style="display: none"
                >
                  <div
                    class="relative-position row justify-center fit animate__animated animation-duration-0-5s box-can-not-buy-item"
                    :class="
                      isNotEnoughMoney
                        ? 'animate__flipInX display-block'
                        : 'animate__flipOutX'
                    "
                  >
                    <div>
                      <q-img
                        src="/images/icon_main/icon-coin-winner.png"
                        width="35px"
                        no-transition
                        no-spinner
                      ></q-img>
                    </div>
                    <div class="self-center f20 q-mx-xs">
                      <span>จำนวนเงินไม่เพียงพอ</span>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <div class="relative-position row fit box-but-items-details" :class="{'mobile':isMobile}">

                  <div class="box-dialog-scroll relative-position" :class="{'mobile':isMobile}">
                    <!-- #region Change Color -->
                    <div class="box-item-selected-list" v-if="isChangeColor">
                      <q-img
                        src="/images/box_main/box-item-shop.png"
                        no-transition
                        no-spinner
                      >
                        <div class="fit row transparent no-padding">
                          <div class="row fit box-item">
                            <div
                              class="box-image self-center relative-position"
                            >
                              <div
                                class="fit absolute-center row justify-center items-center"
                              >
                                <div
                                  class="box-color"
                                  :style="`background-color:${equipment.color}`"
                                ></div>
                              </div>
                            </div>
                            <div class="col self-center relative-position">
                              <div class="absolute-center" style="width: 85%">
                                <div class="text-dialog-item-name">
                                  <span class=""> สีผิว </span>
                                </div>
                                <div class="box-space"></div>
                                <div class="col row">
                                  <div class="self-center icon-cubic">
                                    <q-img
                                      src="/images/shop_main/icon-cubic.webp"
                                      no-transition
                                      no-spinner
                                    ></q-img>
                                  </div>
                                  <div class="self-center text-price">
                                    <span>
                                      {{ `50` }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-1 self-center button-trash">
                              <q-img
                                @click="isNotEnoughMoney ? null : funcRemoveColor()"
                                :class="
                                  isNotEnoughMoney ? 'cursor-not-allowed' : 'cursor-pointer'
                                "
                                src="/images/icon_main/icon-trash.png"
                                no-transition
                                no-spinner
                              ></q-img>
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Item Selected List -->
                    <div
                      class="box-item-selected-list"
                      :class="{'mobile':isMobile}"
                      v-for="(item, index) in itemSelected"
                      v-show="!item.isHas"
                    >
                      <q-img
                        src="/images/box_main/box-item-shop.png"
                        no-transition
                        no-spinner
                      >
                        <div class="fit row transparent no-padding">
                          <div class="row fit box-item" :class="{'mobile':isMobile}">
                            <div class="box-image self-center relative-position" :class="{'mobile':isMobile}">
                              <div class="fit relative-position row justify-center items-center">
                                <q-img
                                  class="absolute-center"
                                  width="80%"
                                  :src="`${item.image}`"
                                  no-transition
                                  no-spinner
                                ></q-img>
                              </div>

                              <q-img
                                v-if="item.isNew"
                                class="absolute-center icon-new"
                                :class="{'mobile':isMobile}"
                                src="/images/icon_main/icon-new-items-shop.png"
                                no-transition
                                no-spinner
                              ></q-img>
                            </div>

                            <div class="col self-center relative-position" align="left">
                              <div class="absolute-center" style="width: 85%">
                                <div class="text-dialog-item-name" :class="{'mobile':isMobile}">
                                  <span class="">
                                    {{ item.itemNameTh }}
                                  </span>
                                </div>
                                <div class="box-space" :class="{'mobile':isMobile}"></div>
                                <div class="col row">
                                  <div class="self-center icon-cubic" :class="{'mobile':isMobile}">
                                    <q-img
                                      src="/images/shop_main/icon-cubic.webp"
                                      no-transition
                                      no-spinner
                                    ></q-img>
                                  </div>
                                  <div class="self-center text-price" :class="{'mobile':isMobile}">
                                    <span
                                      v-if="item.discount > 0"
                                      class="relative-position"
                                    >
                                      {{ `${item.fullPrice}` }}
                                      <div
                                        class="absolute-center"
                                        style="
                                          width: 100%;
                                          height: 0.01cm;
                                          background-color: #d80000;
                                        "
                                      ></div>
                                    </span>
                                    <span>
                                      {{ item.price }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-1 self-center button-trash" :class="{'mobile':isMobile}">
                              <q-img
                                @click="isNotEnoughMoney ? null : funcRemoveItem(item)"
                                :class="
                                  isNotEnoughMoney ? 'cursor-not-allowed' : 'cursor-pointer'
                                "
                                src="/images/icon_main/icon-trash.png"
                                no-transition
                                no-spinner
                              ></q-img>
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->
                  </div>

                </div>

                <!-- #region Total Price -->
                <div class="col-12 self-center row">
                  <div class="col-12 row justify-center q-pb-md" align="cneter">
                    <div class="self-center">
                      <span class="text-dialog-total-price q-mx-sm">
                        {{ `Total: ${totalPrice}` }}
                      </span>
                    </div>
                    <div class="self-center" style="padding-bottom: 5px">
                      <q-img
                        width="30px"
                        class="self-center"
                        src="/images/icon_main/icon-coin-winner.png"
                        no-transition
                        no-spinner
                      ></q-img>
                    </div>
                  </div>
                  <div class="col-12 self-end q-pb-sm" align="center">
                    <q-img
                      :class="
                        isNotEnoughMoney || (itemSelected.length == 0 && !isChangeColor)
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                      "
                      @click="isNotEnoughMoney ? null : funcBuyItem()"
                      width="125px"
                      src="/images/button_main/button-check-out.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
            </q-img>

            <div class="absolute-top-right button-close-dialog" :class="{'mobile':isMobile}" @click="funcCloseBuyDialog()">
              <q-img
                src="/images/icon_main/icon-close.png"
                no-transition
                no-spinner
              ></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- #endregion -->

    <!-- #region Dialog Confirm Setup Outfit -->
    <q-dialog maximized persistent v-model="isShowDialogConfirmSetUpOutfit">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="relative-position">
            <q-img
              width="320px"
              src="/images/box_main/box-confirm-buy-item.png"
              no-transition
              no-spinner
            >
              <div class="fit row transparent">
                <div
                  class="col-12 q-pa-md box-content-text-confirm row justify-center items-center"
                >
                  <div align="center" class="col-12">
                    <q-img
                      width="60%"
                      src="/images/label_main/label-fashionista.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                  <div class="q-pa-md" align="center">
                    <span class="text-content-confirm">
                      เป็นผู้นำด้านแฟชั่นกันเถอะ สวมใส่เสื้อผ้าที่ซื้อทันที
                    </span>
                  </div>
                </div>
                <div class="col-12 self-end q-pa-md row">
                  <div class="col q-pr-sm">
                    <q-img
                      @click="funcGetCharacter()"
                      class="cursor-pointer"
                      src="/images/button_main/button-no.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                  <div class="col q-pl-sm">
                    <q-img
                      class="cursor-pointer"
                      @click="funcSetNewEquipment()"
                      src="/images/button_main/button-yeah.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- #endregion -->

    <!-- #region Loading -->
    <loading-dialog v-if="isLoaded"></loading-dialog>
    <!-- #endregion -->
  </q-page>
</template>

<script setup>
import background from "components/shop_main/background-main.vue";
import character from "components/character_main/character.vue";
import mobileMode from "components/shop_main/mobile-mode.vue";

import loadingDialog from "components/dialog-loading.vue";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useItemShopStore } from "src/stores/item-shop";
import { useStudentStore } from "src/stores/student";
import { useInventoryStore } from "src/stores/inventory";
import { useSystemStore } from "src/stores/system";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

// components
const components = defineComponent({
  background,
  character,
  mobileMode,
});

// #region Initialize
// Store
const itemshopStore = useItemShopStore();
const inventoryStore = useInventoryStore();
const studentStore = useStudentStore();
const systemStore = useSystemStore();

// Quasar
const $q = useQuasar();

// Route And Router
const $router = useRouter();
const $route = useRoute();

// Data
const isMobile = ref($q.platform.is.mobile);
const selectedMenu = ref("skin");
const headerMenuList = ref([
  {
    name: "skin",
    isNew: false,
  },
  {
    name: "head",
    isNew: false,
  },
  {
    name: "body",
    isNew: false,
  },
  {
    name: "footer",
    isNew: false,
  },
  {
    name: "more",
    isNew: false,
  },
]);
const randomString = ref(Math.random().toString(36).substring(7));
const equipment = ref({
  head: {},
  body: {},
  footer: {},
  pet: {},
  other: {},
  color: "",
});

const itemshop = ref({
  head: {
    id: "head-menu",
    list: [],
  },
  body: {
    id: "body-menu",
    list: [],
  },
  footer: {
    id: "footer-menu",
    list: [],
  },
  pet: {
    id: "pet-menu",
    list: [],
  },
  other: {
    id: "other-menu",
    list: [],
  },
});

// Boolean
const isChangeColor = ref(false);

// Dialog
const isShowDialogBuyItem = ref(false);
const isShowDialogConfirmSetUpOutfit = ref(false);

// #endregion

// #region ******* Function *******

// #region Select menu
const isShowSubMenu = ref(false);
const selectMenuType = ref("");
const funcSelectMenu = (menu) => {
  currentItemPage.value = 1;

  let setMenu = menu;

  if ($q.platform.is.mobile) {
    if (menu == "more") {
      isShowSubMenu.value = true;
      if (selectMenuType.value != "") {
        setMenu = selectMenuType.value;
      }
    } else if (menu == "pet" || menu == "other") {
      isShowSubMenu.value = false;
    } else {
      isShowSubMenu.value = false;
      if (selectMenuType.value != "") {
        selectMenuType.value = "pet";
      }
    }
  } else {
    if (menu == "more") {
      selectMenuType.value = "pet";
      setMenu = "pet";
    }
  }

  if (menu == "pet" || menu == "other") {
    selectMenuType.value = menu;
    setMenu = menu;
    selectedMenu.value = "more";
  } else {
    selectedMenu.value = menu;
  }

  let isBreak = false;
  let currentItem = itemSelected.value.find((x) => x.type == setMenu);

  if (currentItem) {
    let findSelectedPage = 0;
    for (let i = 0; i < itemshop.value[setMenu].list.length; i++) {
      let resList = itemshop.value[setMenu].list[i];
      for (let ii = 0; ii < resList.length; ii++) {
        let resItem = itemshop.value[setMenu].list[i][ii];
        if (currentItem.itemId == resItem.itemId) {
          isBreak = true;
          findSelectedPage = i + 1;
          break;
        }
      }
      if (isBreak) {
        break;
      }
    }
    currentItemPage.value = findSelectedPage;
  }
};
// #endregion

// #region Select item
const itemSelected = ref([]);
const funcSelectItem = (item) => {
  let findSelected = itemSelected.value.find((x) => x.itemName == item.itemName);

  if (findSelected) {
    return;
  }

  findSelected = itemSelected.value.find((x) => x.type == item.type);

  if (!findSelected) {
    itemSelected.value.push({ currentPage: currentItemPage.value, ...item });
  } else {
    itemSelected.value = itemSelected.value.filter((x) => x.type != item.type);
    itemSelected.value.push({ currentPage: currentItemPage.value, ...item });
  }

  for (let i = 0; i < itemSelected.value.length; i++) {
    let item = itemSelected.value[i];
    equipment.value[item.type] = item;
  }
};
// #endregion

// #region Change color
const funcChangeColor = () => {
  isChangeColor.value = true;
};
// #endregion

// #region Check selected item
const funcCheckSelectedItem = (item) => {
  let findSelected = itemSelected.value.find((x) => x.itemName == item.itemName);

  if (findSelected) {
    return true;
  }

  return false;
};
// #endregion

// #region Remove item
const funcRemoveItem = (item) => {
  let temp = itemSelected.value.filter((x) => x.type != item.type);

  itemSelected.value = temp;

  equipment.value[item.type] = studentStore.characterData[item.type];
};
// #endregion

// #region Remove color
const funcRemoveColor = () => {
  equipment.value.color = studentStore.characterData.color;
  isChangeColor.value = false;
};
// #endregion

// #region Buy item
const isNotEnoughMoney = ref(false);
let clearAlertTime = null;
const funcBuyItem = async () => {
  if (clearAlertTime) {
    clearTimeout(clearAlertTime);
  }

  let temp = [];

  temp = itemSelected.value.filter((x) => !x.isHas);

  if (temp.length === 0 && !isChangeColor.value) {
    return;
  }

  if (studentStore.coin < totalPrice.value) {
    let elAlert = document.getElementById("alert-not-enough-money");

    elAlert.style.display = "block";
    elAlert.style.zIndex = "999999";

    isNotEnoughMoney.value = true;

    setTimeout(() => {
      isNotEnoughMoney.value = false;
      clearAlertTime = setTimeout(() => {
        elAlert.style.zIndex = "0";
        clearTimeout(clearAlertTime);
        clearAlertTime = null;
      }, 500);
    }, 3000);
    return;
  }

  try {
    isShowDialogBuyItem.value = false;

    isLoaded.value = true;

    let setColor = "";

    if (isChangeColor.value) {
      setColor = equipment.value.color;
    }

    const response = await itemshopStore.buyItemShop(temp, setColor);

    if (response != "success") {
      throw new Error("error");
    }

    if (isChangeColor.value) studentStore.setColor(equipment.value.color);

    if (temp.length) {
      isShowDialogConfirmSetUpOutfit.value = true;
    }

    isChangeColor.value = false;
    isLoaded.value = false;
    funcGetItemShop();
  } catch (e) {
    isLoaded.value = false;
    funcGetItemShop();
    $q.notify({
      message: e,
      position: "top",
      timeout: 3000,
    });
  }
};
// #endregion

// #region Check item
const funcCheckItem = () => {
  isShowDialogBuyItem.value = true;
};
// #endregion

// #region Format Diff in minutes
const funcFormatMinutes = (totalMinute) => {
  let tempData = {
    total: 0,
    isDays: false,
  };

  let minutesInDay = 24 * 60;
  let minutesInHours = 60;

  let days = Math.floor(totalMinute / minutesInDay);

  if (days > 0) {
    tempData.total = days;
    tempData.isDays = true;
  } else {
    let hours = Math.floor(totalMinute / minutesInHours);
    tempData.total = hours >= 0 ? hours : 0;
  }

  return tempData;
};
// #endregion

// #region Reset Shop
const funcResetShop = () => {
  isShowDialogBuyItem.value = false;
  isShowDialogConfirmSetUpOutfit.value = false;
  isChangeColor.value = false;
  itemSelected.value = [];
};
// #endregion

// #region Get Character
const funcGetCharacter = () => {
  equipment.value = { ...studentStore.characterData };

  funcResetShop();
};
// #endregion

// #region Set Equipment
const funcSetNewEquipment = () => {
  isLoaded.value = true;
  isShowDialogConfirmSetUpOutfit.value = false;

  let temp = itemSelected.value.filter((x) => !x.isHas);

  if (temp.length) studentStore.setCharacterData(temp);

  studentStore.setCharacter();

  funcGetCharacter();

  isLoaded.value = false;
};
// #endregion

// #region Close Dialog Buy Item
const funcCloseBuyDialog = () => {
  isShowDialogBuyItem.value = false;
};
// #endregion

// #region Check have item
const funcLoadItemShop = async () => {
  itemshop.value.head.list = [...itemshopStore.itemHead];
  itemshop.value.body.list = [...itemshopStore.itemBody];
  itemshop.value.footer.list = [...itemshopStore.itemFooter];
  itemshop.value.pet.list = [...itemshopStore.itemPet];
  itemshop.value.other.list = [...itemshopStore.itemOther];

  headerMenuList.value.map((item) => {
    if (item.name == "skin") {
      item.isNew = false;
    } else {
      if (item.name == "more") {
        let findType = itemshopStore.itemListAll.find(
          (x) => (x.type == "pet" || x.type == "other") && x.isNew
        );
        if (findType) {
          item.isNew = true;
        }
      } else {
        let findType = itemshopStore.itemListAll.find(
          (x) => x.type == item.name && x.isNew
        );
        if (findType) {
          item.isNew = true;
        }
      }
    }

    return item;
  });

  itemshopStore.itemshop.isNewItem = false;
};
// #endregion

// #region Load item in store
const isLoaded = ref(false);
const funcGetItemShop = async () => {
  if (!itemshopStore.isLoaded) {
    isLoaded.value = true;
  }

  try {
    if (!itemshopStore.isLoaded) {
      isLoaded.value = true;
    } else {
      funcLoadItemShop();
    }

    const response = await itemshopStore.getItemShop();

    if (response !== "success") {
      throw new Error("error");
    }

    funcLoadItemShop();

    isLoaded.value = false;
  } catch (e) {
    $q.notify({
      message: "error get item shop",
      position: "top",
      timeout: 3000,
    });

    isLoaded.value = false;
    $router.replace("/lobby");
  }
};
// #endregion

// #endregion ******* Function *******

// #region ******* Computed *******

// #region Show item list
const currentItemPage = ref(1);
const showItemList = computed(() => {
  let menu = selectedMenu.value;

  if (menu == "skin") return [];

  if (selectedMenu.value == "more") {
    menu = selectMenuType.value;
  }

  if (menu == "") {
    return [];
  }

  let temp = itemshop.value[menu].list;

  if (temp.length) {
    temp = temp;
  }

  return temp || [];
});
// #endregion

//  #region Show Pagination
const showPagination = computed(() => {
  let menu = selectedMenu.value;

  if (menu == "skin") {
    return [];
  }

  if (selectedMenu.value == "more") {
    menu = selectMenuType.value;
  }

  if (menu == "") {
    return [];
  }

  let itemlistLength = itemshop.value[menu].list.length;
  let maxLength = 9;

  if (itemlistLength < 9) {
    maxLength = itemlistLength;
  }

  let tempNumber = [];
  for (let i = 1; i <= maxLength; i++) {
    let setPage = i;
    let totalPage = itemlistLength;
    let currentSelectedPage = currentItemPage.value;

    if (itemlistLength > 9) {
      let hlefPage = Math.ceil(maxLength / 2);

      if (currentSelectedPage > hlefPage && currentSelectedPage < totalPage - 4) {
        let setAddNumber = Math.floor(currentSelectedPage - hlefPage);
        if (currentSelectedPage > hlefPage) {
          setPage = i + setAddNumber;
        }
      } else {
        if (currentSelectedPage <= hlefPage) {
          setPage = i;
        }

        if (currentSelectedPage >= totalPage - 4) {
          setPage = i + (totalPage - 9);
        }
      }

      if (i == 1) {
        setPage = 1;
      }

      if (i == 9) {
        setPage = totalPage;
      }
    }

    tempNumber.push(setPage);
  }

  return tempNumber;
});
// #endregion

// #region Total Price
const totalPrice = computed(() => {
  let sumTotal = 0;

  if (itemSelected.value.length) {
    let tempNotHaveItem = itemSelected.value.filter((x) => !x.isHas);
    sumTotal = tempNotHaveItem.reduce((sum, item) => {
      return sum + item.price;
    }, 0);
  }

  if (isChangeColor.value) sumTotal += 50;

  return sumTotal || 0;
});
// #endregion

// #region Is new item pet
const isNewItemPet = computed(() => {
  let findType = itemshopStore.itemListAll.find((x) => x.type == "pet" && x.isNew);

  return findType ? true : false;
});
// #endregion

// #region Is new item other
const isNewItemOther = computed(() => {
  let findType = itemshopStore.itemListAll.find((x) => x.type == "other" && x.isNew);

  return findType ? true : false;
});
// #endregion

// #endregion ******* Computed *******

// Mounted
onMounted(() => {
  systemStore.setRouter("Shop");

  funcGetCharacter();
  // funcGetItemShop();
  funcLoadItemShop();
});
</script>

<style lang="scss" scoped>

.box-backdrop-main {
  width: 100%;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.background-main {
  max-width: 1600px;
  width: calc(100vh * 16 / 9);
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  container-type: inline-size;
  overflow: hidden;

  &.mobile{
    max-width: 1600px;
    width: 100%;
    min-width: 360px;
    height: 100vh;
    min-height: 100%;
    max-height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;
  }
}

.background-main-mobile {
  max-width: 500px;
  width: 100%;
  min-width: 320px;
}

.box-character-main {
  width: clamp(262.5px,26.25cqw,420px);
  top: clamp(308.125px,30.8125cqw,493px);
  left: clamp(218.75px,21.875cqw,350px);
}

.box-item-shop-main {
  top:clamp(104.9875px,10.49875cqw,167.98px);
  left: clamp(453.75px,45.375cqw,726px);
  width: clamp(468.75px,46.875cqw,750px);
}

// #region Box Item Shop

.box-shop-main {
  width: clamp(437.5px,43.75cqw,700px);
  height: clamp(293.75px,29.375cqw,470px);
  left: 50.15%;
  bottom: clamp(22.5px,2.25cqw,36px);
  transform: translate(-50.15%, 0%);
  border-radius: clamp(31.25px,3.125cqw,50px);
  overflow: hidden;
  background-color: transparent;
}

.button-header-item {
  cursor: pointer;
  color: transparent;
}

.button-header-item.selected {
  color: #a532ea;
}

.text-header {
  font-size: clamp(14px, 1vw, 16px);
  font-family: fredoka;
}

.box-pagination {
  width: 4.694%;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2);
  animation-duration: 0.5s;
}

.pagination-number {
  width: 95%;
  height: 95%;
  background-color: transparent;
  color: #a532ea;
  font-size: clamp(12px, 1vw, 16px);
}

.pagination-number.disable {
  opacity: 0.3;
}

.pagination-number.selected {
  background-color: transparent;
  color: #ffffff;
}

.box-item-main {
  margin-top:clamp(2.5px,0.25cqw,4px);
  height: clamp(240.625px,24.0625cqw,385px);
  color: #00638d;
  font-family: Mali-R;
  font-size: clamp(10px, 1cqw, 16px);

  &.mobile{
    margin:0px;
    background-color:#fff;
    height:60%;
  }

  & .box-item-list-main{
    width: clamp(262.5px,26.25cqw,420px);
    margin: auto
  }

  & .box-color-skin{
    width:50%;
  }

  & .box-pagination-main{
    width: 100%;
    bottom: clamp(6.25px,0.625cqw,10px);
    margin: auto
  }

  & .box-text-skin{
    color:#fff;
    font-size: clamp(10px, 1cqw, 16px);
    padding: clamp(6.25px,0.625cqw,10px) 0px 0px;

    &.mobile{
      color:#00638D;
      padding: 5px 0px;
      font-size:12px;
    }

    & .icon-cubic{
      width: clamp(15.625px,1.5625cqw,25px);
      margin: 0px clamp(3.125px,0.3125cqw,5px);

      &.mobile{
        width: 25px;
      }
    }
  }
}

.box-item-scroll {
  height: 100%;

  & .box-items{
    width:clamp(87.5px,8.75cqw,140px);

    // &.mobile{

    // }
  }
}

.box-items {
  cursor: pointer;
}

.box-items.selected {
  border-radius: 10px;
  box-shadow: 0px 0px 0px 3px #a532ea;
  background-color: #a532ea;
}

.items-sub {
  position: relative;
  background-color: #fafcff;
  border-radius: 10px;
  padding: 10px;
  color: #00638d;
  font-family: Mali-R;
  font-size: clamp(14px, 3vw, 16px);
}

.items-img {
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.text-overflow {
  color: #00638d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-item {
  color: #00638d;
  font-size: clamp(12px, 3vw, 14px);
}

.text-item-name {
  color: #00638d;
  font-size: clamp(8px, 0.75vw, 12px);
}

.text-discount {
  color: #d80000;
}

.text-item-box {
  font-size: clamp(8px, 0.75vw, 12px);
}

.box-label-diff-day {
  font-size: clamp(10px, 1.188vw, 19px);
  padding: 1% 2% 3% 2%;
  background-color: #f05454;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  right: 12px;
  top: 5px;
  color: #fff;
}
// #endregion

// #region Box Total Price Bar
.box-total-price-bar{
  bottom: clamp(25px,2.5cqw,40px);
  left: clamp(125px,12.5cqw,200px);

  &.mobile{
    width: 100%;
    left: 0%;
    margin: 0% auto;
    transition: bottom 0.5s
  }

  & .button-reset{
    width:clamp(31.25px,3.125cqw,50px);

    &.mobile{
      width:48px;
    }
  }

  & .box-shop-price {
    width: clamp(116.875px,11.6875cqw,187px);
    margin: 0px clamp(3.75px,0.375cqw,6px);

    &.mobile{
      width: 170px;
      margin:0px 10px;
    }
  }

  & .text-total-price {
    color: #50008f;
    font-size: clamp(14px, 1.5vw, 24px);
  }

  & .text-overflow {
    color: #50008f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .button-cart{
    width:clamp(43.125px,4.3125cqw,69px);

    &.mobile{
      width:65px;
    }
  }

}
// #endregion

.box-header-bar{
  padding: clamp(10px,1cqw,16px);

  &.mobile{
    padding:5px;
  }

  & .button-back{
    width:clamp(31.25px,3.125cqw,50px);

    &.mobile{
      width:40px;
    }
  }

  & .box-cubic-main{
    width: clamp(106.25px,10.625cqw,170px);
    margin:0px clamp(10px,1cqw,16px);

    &.mobile{
      width:110px;
      margin:0px 12px;
    }

    & .box-total-cubic{
      width:50%;
      top:49%;
      left:63%;
      color:#fff;
      font-size:clamp(15px,1.5cqw,24px);

      &.mobile{
        font-size:16px;
      }
    }
  }
}

// #region Animation Duration
.animation-duration-0-5s {
  animation-duration: 0.5s;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
}
// #endregion

// #region Dialog

.box-dialog-buy-item-main{
  width:clamp(200px,20cqw,320px);

  &.mobile{
    width:320px;
  }
}

.box-but-items-details{
  width:100%;
  height:100%;
  padding:clamp(10px,1cqw,16px);

  &.mobile{
    padding:16px;
  }
}

.button-close-dialog{
  width: clamp(31.25px,3.125cqw,50px);
  top: clamp(-10px,-0.625cqw,-6.25px);
  right: clamp(-10px,-0.625cqw,-6.25px);
  cursor:pointer;

  &.mobile{
    top:-10px;
    right:-10px;
    width:50px;
  }
}

.box-dialog-scroll {
  width:100%;
  height: 75%;
  background-color: #040E37;
  border-radius: clamp(12.5px,1.25cqw,20px);
  padding:clamp(10px,1cqw,16px) clamp(3.125px,0.3125cqw,5px);
  overflow-y: auto;

  &.mobile{
    border-radius: 30px;
    padding:16px 5px;
  }

  & .box-item-selected-list{
    padding:clamp(3.125px,0.3125cqw,5px) 0px 0px;

    &.mobile{
      padding:5px 0px 0px;
    }

    & .box-item{
      width:100%;
      padding: clamp(6.25px,0.625cqw,10px);

      &.mobile{
        padding:10px;
      }

      & .box-image{
        width: clamp(37.5px,3.75cqw,60px);
        height: clamp(37.5px,3.75cqw,60px);
        border-radius: clamp(5px,0.5cqw,8px);
        background: #FFF;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15) inset;

        &.mobile{
          width:50px;
          height:50px;
          border-radius: 8px;
        }
      }

      & .box-space{
        border: 1px dashed #a1aec7;
        margin:clamp(2.5px,0.25cqw,4px) 0px;

        &.mobile{
          margin:4px 0px;
        }
      }

      & .icon-cubic{
        width:clamp(12.5px,1.25cqw,20px);
        margin:0px clamp(3.125px,0.3125cqw,5px);

        &.mobile{
          width:25px;
          margin:0px 5px;
        }
      }

      & .icon-new{
        top:0px;
        width:clamp(21.875px,2.1875cqw,35px);

        &.mobile{
          width:35px;
        }
      }

      & .button-trash{
        width:clamp(21.875px,2.1875cqw,35px);

        &.mobile{
          width:35px;
        }
      }
    }
  }
}

.box-dialog-scroll::-webkit-scrollbar {
  width: 0px;
}

.text-dialog-total-price {
  color: #50008f;
  font-size: 24px;
  font-family: fredoka;
  text-shadow: rgb(255, 255, 255) 1px 0px 0px,
    rgb(255, 255, 255) 0.540302px 0.841471px 0px,
    rgb(255, 255, 255) -0.416147px 0.909297px 0px,
    rgb(255, 255, 255) -0.989992px 0.14112px 0px,
    rgb(255, 255, 255) -0.653644px -0.756802px 0px,
    rgb(255, 255, 255) 0.283662px -0.958924px 0px,
    rgb(255, 255, 255) 0.96017px -0.279415px 0px;
}

.box-content-text-confirm {
  height: 70%;
  background-color: #ecfaff;
  border-radius: 20px;
}

.text-content-confirm {
  font-size: 16px;
  color: #00638d;
}

.box-can-not-buy-item {
  width: 100%;
  padding: 7px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #ffaa2e;
  border-radius: 40px;
}

.text-price {
  color: #00638d;
  font-size:clamp(7.5px,0.75cqw,12px);

  &.mobile{
    font-size:12px;
  }
}

.text-dialog-item-name {
  color: #00638d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(8.75px,0.875cqw,14px);
  line-height:clamp(10px,1cqw,16px);

  &.mobile{
    font-size: 14px;
    line-height:20px;
  }
}

.box-color {
  width: clamp(28.125px,2.8125cqw,45px);
  height: clamp(28.125px,2.8125cqw,45px);
  border-radius: 50%;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.3);

  &.mobile{
    width:45px;
    height:45px;
  }
}
// #endregion

// #region Mobile
.box-character-mobile {
  max-width: 500px;
  width: 100%;
  height: 40%;
  margin: auto;

  & .background-mobile{
    width:180%;
    height:100%;
    background-image: url("/images/background_main/background-shop-mobile.webp");
    background-position: 0% 51%;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

.box-shop-item-mobile {
  max-width: 500px;
  width: 100%;
  background-color: #faf3ff;
  height: 60%;
  margin: auto;
}

.box-skin-container.mobile {
  height: calc(100% - 35%);
  transition: height 0.5s;
  padding: 2% 0%;
}

.box-shop-item-container.mobile {
  height: calc(100% - 35%);
  transition: height 0.5s;
  padding: 2% 0%;
}

.box-pagination-container.mobile {
  max-width: 500px;
  width: 100%;
  margin: auto;
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
}
.box-pagination.mobile {
  width: 9.0909%;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  animation-duration: 0.5s;
}

.pagination-number.mobile {
  width: 95%;
  height: 95%;
  background-color: transparent;
  color: #a532ea;
  font-size: 16px;
}

.pagination-number.disable {
  opacity: 0.3;
}

.pagination-number.selected {
  background-color: #a532ea;
  color: #ffffff;
}
// #endregion
</style>
