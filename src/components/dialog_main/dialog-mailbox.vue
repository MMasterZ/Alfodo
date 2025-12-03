<template>
  <!-- #region Start Animation -->
  <div class="fit box-backdrop-main row justify-center items-center z-max" :class="{'absolute-center':!isMobile,'fixed-center':isMobile}">
    <div class="relative-position">
      <div class="box-start-animation relative-position animate__animated" v-if="isShowStartAnimationMailbox" :class="{'animate__zoomIn':isShowAnimation,'animate__zoomOut':!isShowAnimation}">
        <div>
          <q-img
            src="/images/box_main/box-background-open-mailbox.webp"
            no-spinner
            no-transition
          ></q-img>
        </div>
        <div class="absolute" style="top:0;width: clamp(375px,37.5cqw,600px);">
          <sprite-animation
            :setWidth="1200"
            :setHeight="800"
            :setImage="`/images/sprite_main/sprite-open-mailbox.webp`"
            :setActive="{
              frameRate: 30,
              duration: 0.5,
              isHover: false,
              isActive: true,
              isLoop: false,
            }"
            @callback-finishAnimation="
              isError
                ? null
                : isSuccessResponseServerTime
                ? funcShowDialogMailbox()
                : null
            "
            data-cy="image-sprite-open-mailbox"
          ></sprite-animation>
        </div>
      </div>

      <!-- #region Desktop -->
      <div class="box-dialog-main relative-position animate__animated" :class="{'animate__zoomIn':isShowAnimation,'animate__zoomOut':!isShowAnimation}" v-if="isShowDialogMailbox && $q.platform.is.desktop">
        <div class="box-dialog-sub">
          <!-- #region เมนู -->
          <div class="row font-mali-b">
            <div
              class="button-main menu relative-position"
              :class="selectedMenu == 'mail' ? 'active' : ''"
              @click="funcSelectMenu('mail')"
              @mouseover="isMailHover = true"
              @mouseleave="isMailHover = false"
              align="center"
              data-cy="mailbox-menu"
            >
              <div class="absolute-top-left icon-mail-main">
                <sprite-animation
                  :setWidth="128"
                  :setHeight="96"
                  :setImage="`/images/sprite_main/sprite-mail.png`"
                  :setActive="{
                    frameRate: 10,
                    duration: 0,
                    isHover: isMailHover,
                    isActive: selectedMenu == 'mail' ? true : false,
                    isLoop: false,
                  }"
                ></sprite-animation>
              </div>
              <div align="left">กล่องจดหมาย</div>
              <div class="absolute-top-right icon-new-badge" v-if="isNewMailbox">
                <q-img
                  src="/images/icon_main/icon-new-badge.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>

            <div
              class="button-main menu relative-position"
              :class="selectedMenu == 'news' ? 'active' : ''"
              @click="funcSelectMenu('news')"
              @mouseover="isNewsHover = true"
              @mouseleave="isNewsHover = false"
              align="center"
              data-cy="mailbox-menu"
            >
              <div class="absolute-top-left icon-news-main">
                <sprite-animation
                  :setWidth="128"
                  :setHeight="96"
                  :setImage="`/images/sprite_main/sprite-news.png`"
                  :setActive="{
                    frameRate: 10,
                    duration: 0,
                    isHover: isNewsHover,
                    isActive: selectedMenu == 'news' ? true : false,
                    isLoop: false,
                  }"
                ></sprite-animation>
              </div>
              <div align="left">ข่าวสาร</div>
              <div class="absolute-top-right icon-new-badge" v-if="!isNewNews">
                <q-img
                  src="/images/icon_main/icon-new-badge.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region กล่องจดหมาย  -->
          <div
            class="box-dialog-content row"
            v-if="selectedMenu == 'mail'"
            data-cy="mailbox-content-list"
          >
            <div class="col box-mailbox-list">
              <!-- #region รายการจดหมาย -->
              <div
                class="box-mailbox-scroll relative-position"
                id="mailboox-scroll"
                :style="isHasScroll ? 'padding-right:4px;' : ''"
                data-cy="mailbox-list"
              >
                <!-- #region กรณีที่มีจดหมาย -->
                <div v-if="newsStore.mailboxList.length">
                  <div
                    v-for="(itemMailbox, indexMailbox) in newsStore.mailboxList"
                    :key="indexMailbox"
                    :class="funcMailboxStatus(itemMailbox, 'box')"
                    class="button-main mailbox row"
                    @click="funcSelectMailbox(itemMailbox, indexMailbox)"
                    data-cy="mailbox"
                    v-show="!itemMailbox.isTimeout"
                  >
                    <div
                      class="col-1 self-center box-icon-mailbox"
                      :class="funcMailboxStatus(itemMailbox, 'icon')"
                    >
                      <q-img
                        :src="`/images/icon_main/icon-mailbox-${
                          itemMailbox.type == 'giftbox' ? 'gift' : 'message'
                        }${funcMailboxStatus(itemMailbox, 'img') ? '-open' : ''}.webp`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div class="col self-center">
                      <div class="row">
                        <div class="col font-mali-b text-overflow text-subject">
                          {{ itemMailbox.subject }}
                        </div>
                        <div class="icon-not-open" v-if="!itemMailbox.isRead">
                          <q-img
                            src="/images/icon_main/icon-new-badge.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div
                          class="icon-checked"
                          v-if="
                            (itemMailbox.type == 'giftbox' &&
                              itemMailbox.isReceivedReward &&
                              itemMailbox.isRead) ||
                            (itemMailbox.isRead && itemMailbox.type == 'message')
                          "
                        >
                          <q-img
                            src="/images/icon_main/icon-checked.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </div>

                      <div class="row font-mali-m text-sender">
                        <div class="col text-overflow">
                          {{ itemMailbox.sender }}
                        </div>
                        <div class="box-mailbox-expire" data-cy="">
                          {{ `(${funcRunRemainingTime(itemMailbox)})` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region กรณีไม่มีจดหมาย -->
                <div class="absolute-center font-mali-sb text-no-mail" v-else>
                  ไม่มีจดหมายในขณะนี้
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->

              <!-- #region ปุ่มลบ/ปุ่มรับของ -->
              <div class="box-malibox-button row justify-between">
                <div
                  class="col-1 button-main delete-read"
                  :class="isDeleteAllMailbox ? '' : 'disable'"
                  @click="funcDeleteAllMailbox()"
                  data-cy="button-delete-all-mailbox"
                >
                  <q-img
                    :src="`/images/button_main/button-delete-read${
                      isDeleteAllMailbox ? '' : '-disable'
                    }.webp`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>

                <div
                  class="button-main claim-all"
                  :class="newsStore.mailboxItem.length ? '' : 'disable'"
                  @click="funcClaimAllReward()"
                  data-cy="button-claim-all"
                >
                  <q-img
                    :src="`/images/button_main/button-claim-all${
                      newsStore.mailboxItem.length ? '' : '-disable'
                    }.webp`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
              <!-- #endregion -->
            </div>

            <!-- #region เปิดดูรายละเอียดจดหมาย -->
            <div class="box-mailbox-details-container">
              <div
                class="box-mailbox-details-main relative-position"
                v-if="selectedMailbox == null"
                data-cy="mailbox-details"
              >
                <div
                  class="absolute-center animate__animated animate__fadeIn font-mali-sb animation-duration-0-5s animate__delay-2s"
                  v-if="newsStore.mailboxList.length != 0"
                >
                  เปิดจดหมายเพื่อดูรายละเอียด
                </div>
              </div>

              <div
                class="box-mailbox-details-main relative-position animate__animated animate__fadeIn"
                :class="selectedMailbox != null ? 'active' : ''"
                v-if="selectedMailbox != null"
                data-cy="mailbox-details"
              >
                <div class="box-mailbox-details-topic row">
                  <div class="self-center col font-mali-b text-detail-subject">
                    {{ selectedMailbox.subject }}
                  </div>
                  <div
                    class="col-1 self-center button-main delete-size-s"
                    @click="funcDeleteMailbox()"
                    data-cy="mailbox-details button-delete"
                  >
                    <q-img
                      src="/images/button_main/button-delete-size-s.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>

                <div class="box-mailbox-content">
                  <div class="box-mailbox-content-header">
                    <div class="font-mali-sb text-sender-detail">
                      {{ selectedMailbox.sender }}
                    </div>
                    <div class="row" style="margin-top: clamp(2.5px,0.25cqw,4px); line-height: clamp(8.75px,0.875cqw,14px)">
                      <div class="col font-mali-m text-start-date">
                        {{ `${selectedMailbox.startDate}` }}
                      </div>
                      <div class="text-expire-date" align="right">
                        {{ `(${funcRunRemainingTime(selectedMailbox)})` }}
                      </div>
                    </div>
                    <div class="box-line-separator"></div>
                  </div>

                  <div
                    class="box-mailbox-content-scroll"
                    :class="selectedMailbox.type == 'message' ? 'message' : ''"
                  >
                    <div v-html="selectedMailbox.content" style="padding:0px clamp(2.5px,0.25cqw,4px)" ></div>
                  </div>

                  <!-- #region รายละเอียดของไอเท็ม -->
                  <div
                    class="box-mailbox-content-footer row"
                    v-if="selectedMailbox.type == 'giftbox'"
                  >
                    <div
                      class="col-12 box-mailbox-content-reward row justify-center"
                      data-cy="mailbox-gift-item"
                    >
                      <div
                        class="self-center button-main relative-position"
                        v-for="(itemReward, indexReward) in selectedMailbox.item"
                        :key="indexReward"
                        @click="funcSelectShowRewardDetail(itemReward)"
                        style="width:clamp(30px,3cqw,48px);margin:0px clamp(2.5px,0.25cqw,4px);"
                        data-cy="item-reward"
                      >
                        <q-img
                          :src="`/images/button_main/button-item-${
                            itemReward.grade == 'common' ? '' : 'limited-'
                          }blank.png`"
                          no-spinner
                          no-transition
                          v-if="itemReward.type != 'coin' && itemReward.type != 'key'"
                        >
                        </q-img>
                        <q-img
                          :src="`/images/button_main/button-item-${
                            itemReward.type == 'coin' ? '' : 'limited-'
                          }blank.png`"
                          no-spinner
                          no-transition
                          v-else
                        >
                        </q-img>
                        <div
                          class="absolute-center fit row justify-center items-center"
                        >
                          <div
                            class="self-center col-12"
                            v-if="itemReward.type == 'coin' || itemReward.type == 'key'"
                            align="center"
                            style="padding:0px clamp(2.5px,0.25cqw,4px);"
                          >
                            <q-img
                              width="80%"
                              src="/images/icon_main/icon-coin-winner.png"
                              v-if="itemReward.type == 'coin'"
                              no-spinner
                              no-transition
                            ></q-img>

                            <q-img
                              width="80%"
                              src="/images/icon_main/icon-premium-key.png"
                              v-if="itemReward.type == 'key'"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                          <div
                            class="col-12 self-center"
                            style="width: 80%; border-radius: clamp(5px,0.5cqw,8px); overflow: hidden"
                            v-else
                            align="center"
                          >
                            <q-img
                              :src="`${pathStore}/${itemReward.itemName}.png`"
                              no-spinner
                              no-transition
                              width="95%"
                            ></q-img>
                          </div>

                          <div
                            class="absolute-bottom box-amount-reward"
                            v-if="itemReward.type == 'key' || itemReward.type == 'coin'"
                            align="center"
                            style="bottom: clamp(4.375px,0.4375cqw,7px); height: clamp(7.5px,0.75cqw,12px); line-height: clamp(7.5px,0.75cqw,12px)"
                          >
                            <div class="font-mali-b">
                              {{ funcFormatNumber(itemReward.amount) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 self-end" align="center">
                      <q-img
                        width="clamp(60px,6cqw,96px)"
                        :src="`/images/button_main/button-claim${
                          selectedMailbox.isReceivedReward ? '-disable' : ''
                        }.webp`"
                        :class="selectedMailbox.isReceivedReward ? '' : 'button-main'"
                        no-spinner
                        no-transition
                        @click="funcClaimReward()"
                        data-cy="button-claim-reward"
                      ></q-img>
                    </div>
                  </div>
                  <!-- #endregion -->
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->

          <!-- #region ข่าวสาร -->
          <div
            class="box-dialog-content"
            v-if="selectedMenu == 'news'"
            data-cy="news-content-list"
          >
            <div class="box-news-scroll relative-position">
              <div class="row" v-if="newsStore.newsList.length">
                <div
                  class="col-4"
                  v-for="(itemNews, indexNews) in newsStore.newsList"
                  :key="indexNews"
                  data-cy="button-news"
                >
                  <div
                    class="button-main button-news"
                    @click="funcSelectNews(itemNews, indexNews)"
                  >
                    <div class="box-news-image">
                      <q-img
                        :src="`${itemNews.poster}`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>

                    <div class="row box-news-footer">
                      <div class="col self-center font-mali-b text-news-topic">
                        <span v-html="itemNews.titleTh"> </span>
                      </div>
                      <div
                        class="self-center icon-not-open"
                        v-if="!itemNews.isRead"
                      >
                        <q-img
                          width="clamp(28.125px,2.8125cqw,45px)"
                          src="/images/icon_main/icon-new-badge.webp"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="absolute-center full-width font-mali-sb text-no-news"
                align="center"
              >
                ไม่มีข่าวสารในขณะนี้
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>

        <!-- #region ปุ่มปิด -->
        <div class="absolute-top-right" style="width:clamp(28.75px,2.875cqw,46px);top: clamp(-16px,-1cqw,-10px); right: clamp(-16px,-1cqw,-10px)">
          <q-img
            src="/images/icon_main/icon-close.png"
            no-spinner
            no-transition
            class="button-main"
            @click="funcCloseDialog()"
            data-cy="mailbox-close"
          ></q-img>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Mobile -->
      <div class="box-dialog-main mobile relative-position animate__animated" :class="{'animate__zoomIn':isShowAnimation,'animate__zoomOut':!isShowAnimation}" v-if="isShowDialogMailbox && !$q.platform.is.desktop">
        <div class="box-dialog-sub mobile">
          <!-- #region เมนู -->
          <div class="row font-mali-b">
            <div
              class="button-main menu mobile relative-position"
              :class="selectedMenu == 'mail' ? 'active' : ''"
              @click="funcSelectMenu('mail')"
              @mouseover="isMailHover = true"
              @mouseleave="isMailHover = false"
              align="center"
              data-cy="mailbox-menu"
            >
              <div class="absolute-top-left icon-mail-main mobile">
                <sprite-animation
                  :setWidth="128"
                  :setHeight="96"
                  :setImage="`/images/sprite_main/sprite-mail.png`"
                  :setActive="{
                    frameRate: 10,
                    duration: 0,
                    isHover: false,
                    isActive: selectedMenu == 'mail' ? true : false,
                    isLoop: false,
                  }"
                ></sprite-animation>
              </div>
              <div class="f12">กล่องจดหมาย</div>
              <div class="absolute-top-right icon-new-badge mobile" v-if="isNewMailbox">
                <q-img
                  src="/images/icon_main/icon-new-badge-circle.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>

            <div
              class="button-main menu mobile relative-position"
              :class="selectedMenu == 'news' ? 'active' : ''"
              @click="funcSelectMenu('news')"
              @mouseover="isNewsHover = true"
              @mouseleave="isNewsHover = false"
              align="center"
              data-cy="mailbox-menu"
            >
              <div class="absolute-top-left icon-news-main mobile">
                <sprite-animation
                  :setWidth="128"
                  :setHeight="96"
                  :setImage="`/images/sprite_main/sprite-news.png`"
                  :setActive="{
                    frameRate: 10,
                    duration: 0,
                    isHover: false,
                    isActive: selectedMenu == 'news' ? true : false,
                    isLoop: true,
                  }"
                ></sprite-animation>
              </div>
              <div class="f12">ข่าวสาร</div>
              <div class="absolute-top-right icon-new-badge mobile" v-if="!isNewNews">
                <q-img
                  src="/images/icon_main/icon-new-badge-circle.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region กล่องจดหมาย  -->
          <div
            class="box-dialog-content mobile"
            v-if="selectedMenu == 'mail'"
            data-cy="mailbox-content-list"
          >
            <div class="box-mailbox-list mobile">
              <!-- #region รายการจดหมาย -->
              <div
                class="box-mailbox-scroll mobile relative-position"
                id="mailboox-scroll"
                :style="isHasScroll ? 'padding-right:4px;' : ''"
                data-cy="mailbox-list"
              >
                <!-- #region กรณีที่มีจดหมาย -->
                <div v-if="newsStore.mailboxList.length">
                  <div
                    v-for="(itemMailbox, indexMailbox) in newsStore.mailboxList"
                    :key="indexMailbox"
                    :class="funcMailboxStatus(itemMailbox, 'box')"
                    class="button-main mailbox row mobile"
                    @click="funcSelectMailbox(itemMailbox, indexMailbox)"
                    data-cy="mailbox"
                    v-show="!itemMailbox.isTimeout"
                  >
                    <div
                      class="col-1 self-center box-icon-mailbox mobile"
                      :class="funcMailboxStatus(itemMailbox, 'icon')"
                    >
                      <q-img
                        :src="`/images/icon_main/icon-mailbox-${
                          itemMailbox.type == 'giftbox' ? 'gift' : 'message'
                        }${funcMailboxStatus(itemMailbox, 'img') ? '-open' : ''}.webp`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div class="col self-center">
                      <div class="row">
                        <div class="col font-mali-b f14 text-overflow">
                          {{ itemMailbox.subject }}
                        </div>
                        <div class="icon-not-open" v-if="!itemMailbox.isRead">
                          <q-img
                            width="45px"
                            height="20px"
                            src="/images/icon_main/icon-new-badge.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div
                          class="icon-checked"
                          v-if="
                            (itemMailbox.type == 'giftbox' &&
                              itemMailbox.isReceivedReward &&
                              itemMailbox.isRead) ||
                            (itemMailbox.isRead && itemMailbox.type == 'message')
                          "
                        >
                          <q-img
                            src="/images/icon_main/icon-checked.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </div>

                      <div class="row font-mali-m f10" style="margin-top: 8px">
                        <div class="col text-overflow">
                          {{ itemMailbox.sender }}
                        </div>
                        <div class="box-mailbox-expire mobile">
                          {{ `(${funcRunRemainingTime(itemMailbox)})` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region กรณีไม่มีจดหมาย -->
                <div
                  class="absolute-center full-width font-mali-sb f14"
                  v-else
                  align="center"
                >
                  ไม่มีจดหมายในขณะนี้
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->

              <!-- #region ปุ่มลบ/ปุ่มรับของ -->
              <div class="box-malibox-button mobile row justify-between">
                <div
                  class="button-main delete-read mobile"
                  :class="newsStore.mailboxList.length ? '' : 'disable'"
                  @click="funcDeleteAllMailbox()"
                  data-cy="button-delete-all-mailbox"
                >
                  <q-img
                    :src="`/images/button_main/button-delete-read${
                      newsStore.mailboxList.length ? '' : '-disable'
                    }-mobile.webp`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div
                  class="button-main claim-all mobile"
                  :class="newsStore.mailboxItem.length ? '' : 'disable'"
                  @click="funcClaimAllReward()"
                  data-cy="button-claim-all"
                >
                  <q-img
                    :src="`/images/button_main/button-claim-all${
                      newsStore.mailboxItem.length ? '' : '-disable'
                    }-mobile.webp`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region ข่าวสาร -->
          <div
            class="box-dialog-content mobile"
            v-if="selectedMenu == 'news'"
            data-cy="news-content-list"
          >
            <div
              class="box-news-scroll mobile relative-position"
              id="news-scroll"
              :style="isHasScroll ? 'padding-right:4px;' : ''"
            >
              <div v-if="newsStore.newsList.length">
                <div
                  v-for="(itemNews, indexNews) in newsStore.newsList"
                  :key="indexNews"
                  data-cy="button-news"
                >
                  <div
                    class="button-main button-news mobile"
                    @click="funcSelectNews(itemNews, indexNews)"
                  >
                    <div class="box-news-image mobile">
                      <q-img
                        :src="`${itemNews.poster}`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>

                    <div class="row box-news-footer mobile">
                      <div
                        class="col self-center f12 font-mali-b text-news-topic mobile"
                      >
                        <span v-html="itemNews.titleTh"></span>
                      </div>
                      <div class="icon-not-open" v-if="!itemNews.isRead">
                        <q-img
                          height="20px"
                          src="/images/icon_main/icon-new-badge.webp"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="absolute-center full-width f14 font-mali-sb"
                align="center"
                v-else
              >
                ไม่มีข่าวสารในขณะนี้
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>

        <!-- #region ปุ่มปิด -->
        <div class="absolute-top-right" style="top: -16px; right: -16px">
          <q-img
            width="46.62px"
            src="/images/icon_main/icon-close.png"
            no-spinner
            no-transition
            class="button-main"
            @click="funcCloseDialog()"
          ></q-img>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
  </div>

  <div class="fit row justify-center items-center z-max" :class="{'absolute-center':!isMobile,'fixed-center':isMobile}" v-if="isShowDialogContentMailbox">
    <div
      class="box-dialog-main content-mailbox relative-position"
      data-cy="mailbox-details"
    >
      <div class="box-dialog-sub content-mailbox no-padding">
        <!-- #region หัวข้อ -->
        <div class="box-mailbox-details-topic mobile content-mailbox row">
          <div class="self-center font-mali-b f14 text-overflow">
            {{ selectedMailbox.subject }}
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region รายละเอียดอีเมล์ -->
        <div class="box-mailbox-content mobile content-mailbox">
          <!-- #region ชื่อคนส่ง -->
          <div class="box-mailbox-content-header mobile">
            <div class="font-mali-sb f14 text-overflow">
              {{ selectedMailbox.sender }}
            </div>
            <div class="row" style="margin-top: 4px; line-height: 14px">
              <div class="col font-mali-m f12">
                {{ `${selectedMailbox.startDate}` }}
              </div>
              <div class="f10" align="right">
                {{ `(${funcRunRemainingTime(selectedMailbox)})` }}
              </div>
            </div>
            <div class="box-line-separator"></div>
          </div>
          <!-- #endregion -->

          <!-- #region เนื้อหา -->
          <div
            class="box-mailbox-content-scroll mobile"
            :class="selectedMailbox.type != 'giftbox' ? 'message' : ''"
          >
            <div v-html="selectedMailbox.content" class="q-px-xs"></div>
          </div>
          <!-- #endregion -->

          <!-- #region รายละเอียดของไอเท็ม -->
          <div
            class="box-mailbox-content-footer mobile row "
            :class="selectedMailbox.type != 'giftbox' ? 'message' : ''"
          >
            <div
              class="col-12 box-mailbox-content-reward mobile row justify-center"
              v-if="selectedMailbox.type == 'giftbox'"
              data-cy="mailbox-gift-item"
            >
              <div
                class="self-center button-main relative-position"
                style="margin: 2px"
                v-for="(itemReward, indexReward) in selectedMailbox.item"
                :key="indexReward"
                @click="funcSelectShowRewardDetail(itemReward)"
                data-cy="item-reward"
              >
                <q-img
                  width="48px"
                  :src="`/images/button_main/button-item-${
                    itemReward.grade == 'common' ? '' : 'limited-'
                  }blank.png`"
                  no-spinner
                  no-transition
                  v-if="itemReward.type != 'coin' && itemReward.type != 'key'"
                >
                </q-img>
                <q-img
                  width="48px"
                  :src="`/images/button_main/button-item-${
                    itemReward.type == 'coin' ? '' : 'limited-'
                  }blank.png`"
                  no-spinner
                  no-transition
                  v-else
                >
                </q-img>
                <div class="absolute-center fit row justify-center items-center">
                  <div
                    class="col-12 q-pa-sm"
                    v-if="itemReward.type == 'coin' || itemReward.type == 'key'"
                  >
                    <q-img
                      src="/images/icon_main/icon-coin-winner.png"
                      v-if="itemReward.type == 'coin'"
                      no-spinner
                      no-transition
                    ></q-img>

                    <q-img
                      src="/images/icon_main/icon-premium-key.png"
                      v-if="itemReward.type == 'key'"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div
                    class="col-12"
                    style="width: 80%; border-radius: 8px; overflow: hidden"
                    v-else
                    align="center"
                  >
                    <q-img
                      :src="`${pathStore}/${itemReward.itemName}.png`"
                      no-spinner
                      no-transition
                      width="95%"
                    ></q-img>
                  </div>

                  <div
                    class="absolute-bottom box-amount-reward f12"
                    v-if="itemReward.type == 'key' || itemReward.type == 'coin'"
                    align="center"
                    style="bottom: 7px; height: 12px; line-height: 12px"
                  >
                    <div class="font-mali-b">
                      {{ funcFormatNumber(itemReward.amount) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row col-12 ">
              <div
                class="col-1 self-end button-main delete-size-s "
                :class="{'mobile':isMobile}"
                align="left"
                @click="funcDeleteMailbox()"
                data-cy="mailbox-details button-delete"
              >
                <q-img
                  width="32px"
                  src="/images/button_main/button-delete-size-s.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div
                class="col self-end button-main "
                align="right"
                v-if="selectedMailbox.type == 'giftbox'"
                @click="funcClaimReward()"
                data-cy="button-claim-reward"
              >
                <q-img
                width="96px"
                  :src="`/images/button_main/button-claim${
                    selectedMailbox.isReceivedReward ? '-disable' : ''
                  }-mobile.webp`"
                  :class="selectedMailbox.isReceivedReward ? '' : 'button-main'"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>

      <!-- #region ปุ่มปิด -->
      <div class="absolute-top-right" style="top: -16px; right: -16px">
        <q-img
          width="46.62px"
          src="/images/icon_main/icon-close.png"
          no-spinner
          no-transition
          class="button-main"
          @click="funcCloseContentMailbox()"
          data-cy="button-close-content-mailbox"
        ></q-img>
      </div>
      <!-- #endregion -->
    </div>
  </div>


  <q-dialog
    v-model="isShowStartAnimationMailbox"
    maximized
    persistent
    data-cy="mailbox-landing-animation"
    class="z-max"
    v-if="false"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-start-animation relative-position">
          <div>
            <q-img
              src="/images/box_main/box-background-open-mailbox.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div class="absolute" style="max-width: 600px; width: 100%; top: 0%">
            <sprite-animation
              :setWidth="1200"
              :setHeight="800"
              :setImage="`/images/sprite_main/sprite-open-mailbox.webp`"
              :setActive="{
                frameRate: 30,
                duration: 0.5,
                isHover: false,
                isActive: true,
                isLoop: false,
              }"
              @callback-finishAnimation="
                isError
                  ? null
                  : isSuccessResponseServerTime
                  ? funcShowDialogMailbox()
                  : null
              "
              data-cy="image-sprite-open-mailbox"
            ></sprite-animation>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Mailbox -->
  <q-dialog
    v-model="isShowDialogMailbox"
    maximized
    persistent
    data-cy="mailbox-dialog"
    class="z-max"
    v-if="false"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">

      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Content Mailbox -->
  <q-dialog v-model="isShowDialogContentMailbox" maximized persistent class="z-max" v-if="false">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="box-dialog-main content-mailbox relative-position"
          data-cy="mailbox-details"
        >
          <div class="box-dialog-sub content-mailbox no-padding">
            <!-- #region หัวข้อ -->
            <div class="box-mailbox-details-topic mobile content-mailbox row">
              <div class="self-center font-mali-b f14">
                {{ selectedMailbox.subject }}
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region รายละเอียดอีเมล์ -->
            <div class="box-mailbox-content mobile content-mailbox">
              <!-- #region ชื่อคนส่ง -->
              <div class="box-mailbox-content-header mobile">
                <div class="font-mali-sb f14 text-overflow">
                  {{ selectedMailbox.sender }}
                </div>
                <div class="row" style="margin-top: 4px; line-height: 14px">
                  <div class="col font-mali-m f12">
                    {{ `${selectedMailbox.startDate}` }}
                  </div>
                  <div class="f10" align="right">
                    {{ `(${funcRunRemainingTime(selectedMailbox)})` }}
                  </div>
                </div>
                <div class="box-line-separator"></div>
              </div>
              <!-- #endregion -->

              <!-- #region เนื้อหา -->
              <div
                class="box-mailbox-content-scroll mobile"
                :class="selectedMailbox.type != 'giftbox' ? 'message' : ''"
              >
                <div v-html="selectedMailbox.content" class="q-px-xs"></div>
              </div>
              <!-- #endregion -->

              <!-- #region รายละเอียดของไอเท็ม -->
              <div
                class="box-mailbox-content-footer mobile row"
                :class="selectedMailbox.type != 'giftbox' ? 'message' : ''"
              >
                <div
                  class="col-12 box-mailbox-content-reward mobile row justify-center"
                  v-if="selectedMailbox.type == 'giftbox'"
                  data-cy="mailbox-gift-item"
                >
                  <div
                    class="self-center button-main relative-position"
                    style="margin: 2px"
                    v-for="(itemReward, indexReward) in selectedMailbox.item"
                    :key="indexReward"
                    @click="funcSelectShowRewardDetail(itemReward)"
                    data-cy="item-reward"
                  >
                    <q-img
                      width="48px"
                      :src="`/images/button_main/button-item-${
                        itemReward.grade == 'common' ? '' : 'limited-'
                      }blank.png`"
                      no-spinner
                      no-transition
                      v-if="itemReward.type != 'coin' && itemReward.type != 'key'"
                    >
                    </q-img>
                    <q-img
                      width="48px"
                      :src="`/images/button_main/button-item-${
                        itemReward.type == 'coin' ? '' : 'limited-'
                      }blank.png`"
                      no-spinner
                      no-transition
                      v-else
                    >
                    </q-img>
                    <div class="absolute-center fit row justify-center items-center">
                      <div
                        class="col-12 q-pa-sm"
                        v-if="itemReward.type == 'coin' || itemReward.type == 'key'"
                      >
                        <q-img
                          src="/images/icon_main/icon-coin-winner.png"
                          v-if="itemReward.type == 'coin'"
                          no-spinner
                          no-transition
                        ></q-img>

                        <q-img
                          src="/images/icon_main/icon-premium-key.png"
                          v-if="itemReward.type == 'key'"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                      <div
                        class="col-12"
                        style="width: 80%; border-radius: 8px; overflow: hidden"
                        v-else
                        align="center"
                      >
                        <q-img
                          :src="`${pathStore}/${itemReward.itemName}.png`"
                          no-spinner
                          no-transition
                          width="95%"
                        ></q-img>
                      </div>

                      <div
                        class="absolute-bottom box-amount-reward f12"
                        v-if="itemReward.type == 'key' || itemReward.type == 'coin'"
                        align="center"
                        style="bottom: 7px; height: 12px; line-height: 12px"
                      >
                        <div class="font-mali-b">
                          {{ funcFormatNumber(itemReward.amount) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="col-1 self-end button-main delete-size-s"
                  align="left"
                  @click="funcDeleteMailbox()"
                  data-cy="mailbox-details button-delete"
                >
                  <q-img
                    src="/images/button_main/button-delete-size-s.webp"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div
                  class="col self-end"
                  align="right"
                  v-if="selectedMailbox.type == 'giftbox'"
                  @click="funcClaimReward()"
                  data-cy="button-claim-reward"
                >
                  <q-img
                    width="96px"
                    :src="`/images/button_main/button-claim${
                      selectedMailbox.isReceivedReward ? '-disable' : ''
                    }-mobile.webp`"
                    :class="selectedMailbox.isReceivedReward ? '' : 'button-main'"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>

          <!-- #region ปุ่มปิด -->
          <div class="absolute-top-right" style="top: -16px; right: -16px">
            <q-img
              width="46.62px"
              src="/images/icon_main/icon-close.png"
              no-spinner
              no-transition
              class="button-main"
              @click="funcCloseContentMailbox()"
              data-cy="button-close-content-mailbox"
            ></q-img>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Confirm Delete All Mailbox -->
  <q-dialog
    v-model="isShowDialogConfirmDeleteAllMailbox"
    maximized
    persistent
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-main box-delete-read-all" data-cy="box-delete-all-mailbox">
          <div class="box-dialog-sub box-delete-read-all">
            <div class="f20 font-mali-b" align="center">ยืนยันการลบ</div>
            <div class="f14 font-mali-sb q-my-lg" align="center">
              ยืนยันการลบจดหมายที่อ่านแล้ว <br />
              จดหมายที่ยังไม่ได้รับรางวัลจะไม่ถูกลบ
            </div>
            <div class="row justify-center items-end">
              <div class="button-main cancel-delete-mail all">
                <q-img
                  src="/images/button_main/button-cancel.webp"
                  no-spinner
                  no-transition
                  @click="funcCancelDeleteAllMailbox()"
                  data-cy="button-cancel-delete-all-mailbox"
                  v-close-popup
                ></q-img>
              </div>
              <div class="button-main delete-mail all">
                <q-img
                  src="/images/button_main/button-delete-mail.webp"
                  no-spinner
                  no-transition
                  v-close-popup
                  @click="funcConfirmDeleteAllMailbox()"
                  data-cy="button-confirm-delete-all-mailbox"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Confirm Delete Mailbox -->
  <q-dialog v-model="isShowDialogConfirmDeleteMailbox" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-main box-delete-read" data-cy="box-confirm-delete-mailbox">
          <div class="box-dialog-sub box-delete-read">
            <div class="f20 font-mali-b" align="center">ยืนยันการลบ</div>
            <div class="f14 font-mali-sb q-my-lg" align="center">
              คุณต้องการลบจดหมายนี้หรือไม่? <br />
              จดหมายนี้จะถูกลบถาวร
            </div>
            <div class="row justify-between items-end">
              <div class="button-main cancel-delete-mail">
                <q-img
                  src="/images/button_main/button-cancel.webp"
                  no-spinner
                  no-transition
                  @click="funcCancelDeleteMailbox()"
                  data-cy="button-cancel-delete-mailbox"
                  v-close-popup
                ></q-img>
              </div>
              <div class="button-main delete-mail">
                <q-img
                  src="/images/button_main/button-delete-mail.webp"
                  no-spinner
                  no-transition
                  v-close-popup
                  @click="funcConfirmDeleteMailbox()"
                  data-cy="button-confirm-delete-mailbox"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Cannot be delete -->
  <q-dialog v-model="isShowDialogCannotBeDelete" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="box-dialog-main box-get-reward-before-delete"
          data-cy="box-confirm-get-reward"
        >
          <div class="box-dialog-sub box-get-reward-before-delete row">
            <div align="center" class="col-12 f20 font-mali-b">รับของรางวัลก่อนลบ</div>
            <div align="center" class="col-12 f14 q-my-lg font-mali-sb">
              มีของรางวัลที่ยังไม่ได้รับในจดหมาย
              <br />
              คุณจำเป็นต้องกดรับก่อน
              <br />
              จึงจะสามารถลบจดหมายได้
            </div>
            <div class="col-12 row justify-between items-end">
              <div
                class="button-main button-cancel-purple"
                data-cy="button-cancel-get-reward"
                v-close-popup
              >
                <q-img
                  src="/images/button_main/button-cancel-purple.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div
                class="button-main button-get-reward"
                @click="funcClaimAllReward()"
                data-cy="button-confirm-claim-reward"
              >
                <q-img
                  src="/images/button_main/button-get-reward.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <q-dialog
    v-model="isShowDialogGetReward"
    persistent
    maximized
    style="background-color: rgba(0, 0, 0, 0.75)"
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section
        class="fit row justify-center items-center no-padding"
        style="overflow: hidden"
      >
        <div class="box-dialog-get-reward">
          <dialog-reward
            :rewardList="showItemReward"
            @callback-closeDialog="funcCloseDialogGetReward()"
          ></dialog-reward>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <dialog-news-content
    v-if="isShowDialogNewsContent"
    :newsData="selectedNews"
    @callback-closeDialog="isShowDialogNewsContent = false"
  ></dialog-news-content>

  <dialog-item-info
    v-if="isShowDialogItemInfo"
    :itemData="selectedReward"
    @callback-closeDialog="funcCloseDialogItemInfo()"
  ></dialog-item-info>
</template>

<script setup>
import dialogItemInfo from "components/dialog_main/dialog-item-info.vue";
import dialogReward from "components/dialog_main/dialog-reward.vue";
import dialogNewsContent from "components/dialog_main/dialog-news-content.vue";
import spriteAnimation from "components/animation_main/sprite_animation_main.vue";
import { useQuasar } from "quasar";
import { ref, computed, watch, onMounted } from "vue";

import { useNewsStore } from "src/stores/news";
import { useSystemStore } from "src/stores/system";

// Store
const newsStore = useNewsStore();

// Instance
const $q = useQuasar();
const emit = defineEmits(["callback-closeDialog"]);

// Data
const pathStore = ref(
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
);

const isShowAnimation = ref(true);

const selectedMenu = ref("");
const selectedMailbox = ref(null);
const selectedNews = ref(null);
const selectedReward = ref(null);
const showItemReward = ref([]);

// Boolearn
const isMailHover = ref(false);
const isNewsHover = ref(false);

// Dialog
const isShowDialogMailbox = ref(false);
const isShowStartAnimationMailbox = ref(true);
const isShowDialogNewsContent = ref(false);
const isShowDialogContentMailbox = ref(false);
const isShowDialogConfirmDeleteMailbox = ref(false);
const isShowDialogConfirmDeleteAllMailbox = ref(false);
const isShowDialogCannotBeDelete = ref(false);
const isShowDialogGetReward = ref(false);
const isShowDialogItemInfo = ref(false);

// #region select news
const funcSelectNews = async (value, index) => {
  selectedNews.value = value;

  $q.loading.show();

  const response = await newsStore.readNews(value);

  if (response != "success") {
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });

    $q.loading.hide();
    return;
  }

  isShowDialogNewsContent.value = true;

  $q.loading.hide();
};
// #endregion

// #region select mailbox
const funcSelectMailbox = (value, index) => {
  selectedMailbox.value = null;

  newsStore.clearSelected();

  newsStore.mailboxList[index].isSelected = true;

  selectedMailbox.value = value;

  if (!$q.platform.is.desktop) {
    isShowDialogContentMailbox.value = true;
  }

  newsStore.readMailbox(value).then((res) => {
    if (res == "error") {
      $q.notify({
        message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
      selectedMailbox.value = null;
      isShowDialogContentMailbox.value = false;
      return;
    }
  });
};
// #endregion

// #region select menu
const funcSelectMenu = (name) => {
  newsStore.clearSelected();

  selectedMenu.value = name;

  selectedMailbox.value = null;
};
// #endregion

// #region mailbox status
const funcMailboxStatus = (item, type) => {
  if (type != "img") {
    if (item.isSelected) {
      return "active";
    } else {
      if (
        (item.isReceivedReward && item.type == "giftbox" && item.isRead) ||
        (item.type == "message" && item.isRead)
      ) {
        return "opened";
      }
    }
  }

  if (type == "img") {
    if (
      (item.isReceivedReward && item.type == "giftbox") ||
      (item.type == "message" && item.isRead)
    ) {
      return "-open";
    }
  }

  return "";
};
// #endregion

// #region delete all mailbox
const funcDeleteAllMailbox = () => {
  isSelectedDeleteForMailbox.value = false;

  if (!isDeleteAllMailbox.value) {
    return;
  }

  // if (newsStore.mailboxItem.length) {
  //   isShowDialogCannotBeDelete.value = true;
  //   return;
  // }

  isShowDialogConfirmDeleteAllMailbox.value = true;
};
// #endregion

// #region delete mailbox
const isSelectedDeleteForMailbox = ref(false);
const funcDeleteMailbox = () => {
  let data = selectedMailbox.value;

  isSelectedDeleteForMailbox.value = true;

  if (data.type == "giftbox") {
    if (!data.isReceivedReward) {
      isShowDialogCannotBeDelete.value = true;
      return;
    }
  }

  isShowDialogConfirmDeleteMailbox.value = true;
};
// #endregion

// #region confirm delete all mailbox
const funcConfirmDeleteAllMailbox = async () => {
  isShowDialogConfirmDeleteAllMailbox.value = false;

  $q.loading.show();

  let response = await newsStore.deleteAllMailbox();

  if (response != "success") {
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });

    $q.loading.hide();

    return;
  }

  let findSelectCurrentData = newsStore.mailboxList.find(
    (item) => item.logId == selectedMailbox.value.logId
  );

  if (!findSelectCurrentData) {
    if (selectedMailbox.value != null) {
      selectedMailbox.value = null;
    }
  }

  $q.loading.hide();
};
// #endregion

// #region confirm delete mailbox
const funcConfirmDeleteMailbox = async () => {
  isShowDialogConfirmDeleteMailbox.value = false;

  if (!$q.platform.is.desktop) {
    isShowDialogContentMailbox.value = false;
  }

  let data = selectedMailbox.value;

  $q.loading.show();

  let response = await newsStore.deleteMailbox(data);

  if (response != "success") {
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });

    $q.loading.hide();

    return;
  }

  selectedMailbox.value = null;

  $q.loading.hide();
};
// #endregion

// #region claim all reward
const funcClaimAllReward = async () => {
  if (isSelectedDeleteForMailbox.value) {
    funcClaimReward();
    isShowDialogCannotBeDelete.value = false;
    isSelectedDeleteForMailbox.value = false;
    return;
  }

  if (newsStore.mailboxItem.length == 0) return;

  isShowDialogCannotBeDelete.value = false;

  showItemReward.value = newsStore.mailboxItem;

  $q.loading.show();

  let response = await newsStore.claimAllMailbox();

  if (response != "success") {
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });

    if (selectedMailbox.value != null) {
      selectedMailbox.value = null;
    }

    isShowDialogGetReward.value = false;

    $q.loading.hide();

    return;
  }

  if (selectedMailbox.value != null) {
    if (!selectedMailbox.value.isReceivedReward) {
      selectedMailbox.value.isReceivedReward = true;
    }
  }

  isShowDialogGetReward.value = true;

  $q.loading.hide();
};
// #endregion

// #region claim reward
const funcClaimReward = async () => {
  if (selectedMailbox.value != null) {
    if (selectedMailbox.value.isReceivedReward) {
      return;
    }
  }

  $q.loading.show();

  let response = await newsStore.claimReward(selectedMailbox.value);

  if (response != "success") {
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });

    selectedMailbox.value = null;

    isShowDialogGetReward.value = false;

    isShowDialogContentMailbox.value = false;

    $q.loading.hide();

    return;
  }

  isShowDialogGetReward.value = true;

  showItemReward.value = selectedMailbox.value.item;

  selectedMailbox.value.isReceivedReward = true;

  $q.loading.hide();
};
// #endregion

// #region close dialog get reward
const funcCloseDialogGetReward = () => {
  showItemReward.value = [];

  isShowDialogGetReward.value = false;
};
// #endregion

// #region show dialog mailbox
const funcShowDialogMailbox = () => {

    isShowAnimation.value = false;

    setTimeout(() => {
      isShowStartAnimationMailbox.value = false;
      setTimeout(() => {
        isShowAnimation.value = true
        isShowDialogMailbox.value = true;
        selectedMenu.value = "mail";
      }, 100);
    }, 300);

};
// #endregion

// #region has scroll
const isHasScroll = ref(false);
const funcHasScroll = (id) => {
  setTimeout(() => {
    let element = document.getElementById(id);

    if (element) {
      if (element.scrollHeight > element.clientHeight) {
        isHasScroll.value = true;
      } else {
        isHasScroll.value = false;
      }
    }
  }, 500);
};
// #endregion

// #region select show reward detail
const funcSelectShowRewardDetail = (item) => {
  selectedReward.value = item;

  isShowDialogItemInfo.value = true;
};
// #endregion

// #region run expire date
const funcRunRemainingTime = (data) => {
  let datatime = new Date(
    `${serverTime.year}/${serverTime.month + 1}/${serverTime.day} ${serverTime.hours}:${
      serverTime.minutes
    }:00`
  );

  let mailboxTime = new Date(`${data.expireDate.date} ${data.expireDate.time}:00`);

  let difference = mailboxTime - datatime;

  const differenceInSeconds = Math.floor(difference / 1000);

  const secondsInDay = 86400;
  const secondsInHour = 3600;
  const secondsInMinute = 60;

  const days = Math.floor(differenceInSeconds / secondsInDay);
  const hours = Math.floor((differenceInSeconds % secondsInDay) / secondsInHour);
  const minutes = Math.floor((differenceInSeconds % secondsInHour) / secondsInMinute);

  if (days > 0) {
    return `หมดอายุใน ${days} วัน`;
  } else {
    if (hours > 0) {
      return `หมดอายุใน ${hours} ชั่วโมง`;
    }

    if (minutes > 0) {
      return `หมดอายุใน ${minutes} นาที`;
    }

    data.isTimeout = true;

    return "หมดอายุแล้ว";
  }
};
// #endregion

// #region close dialog
const funcCloseDialog = () => {
  newsStore.clearSelected();

  isShowDialogMailbox.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};
// #endregion

// #region close content mailbox
const funcCloseContentMailbox = () => {
  newsStore.clearSelected();

  isShowDialogContentMailbox.value = false;
};
// #endregion

// #region close popup
const funcClosePopup = () => {
  newsStore.clearSelected();

  isShowDialogConfirmDeleteAllMailbox.value = false;
  isShowDialogConfirmDeleteMailbox.value = false;
  isShowDialogCannotBeDelete.value = false;
  isSelectedDeleteForMailbox.value = false;

  showItemReward.value = [];
};
// #endregion

// #region cancel delete mailbox
const funcCancelDeleteMailbox = () => {
  isShowDialogConfirmDeleteMailbox.value = false;
};
// #endregion

// #region cancel delete all mailbox
const funcCancelDeleteAllMailbox = () => {
  isShowDialogConfirmDeleteAllMailbox.value = false;
};
// #endregion

// #region close dialog item info
const funcCloseDialogItemInfo = () => {
  selectedReward.value = null;

  isShowDialogItemInfo.value = false;
};
// #endregion

// #region format number
const funcFormatNumber = (number) => {
  let amount = Number(number);

  return amount.toLocaleString();
};
// #endregion

// #region *** Computed ***
const isNewMailbox = computed(() => {
  let isCheck = false;

  if (newsStore.mailboxList.length > 0) {
    let temp = newsStore.mailboxList.filter(
      (item) => !item.isRead || (item.type == "giftbox" && !item.isReceivedReward)
    );

    if (temp.length) {
      isCheck = true;
    }
  }

  return isCheck;
});

const isDeleteAllMailbox = computed(() => {
  let isCheck = false;

  if (newsStore.mailboxList.length > 0) {
    let temp = newsStore.mailboxList.filter(
      (item) =>
        (item.type == "message" && item.isRead) ||
        (item.type == "giftbox" && item.isReceivedReward && item.isRead)
    );

    if (temp.length) {
      isCheck = true;
    }
  }

  return isCheck;
});

const isNewNews = computed(() => {
  return newsStore.newsList.every((item) => item.isRead);
});
// #endregion

// #region *** watch ***
watch(
  () => selectedMenu.value,
  (val) => {
    if (val == "news") {
      funcHasScroll("news-scroll");
    } else {
      funcHasScroll("mailboox-scroll");
    }
  },
  {
    immediate: true,
  }
);
// #endregion

let serverTime = null;
const isError = ref(false);
const isSuccessResponseServerTime = ref(false);
onMounted(() => {
  const systemStore = useSystemStore();
  const newsStore = useNewsStore();

  newsStore.clearSelected();

  systemStore.getServerTime().then((res) => {
    try {
      if (res.message != "success") {
        throw new Error("error");
      }

      serverTime = res.data;

      isSuccessResponseServerTime.value = true;
    } catch (e) {
      isError.value = true;

      $q.notify({
        message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        color: "negative",
        position: "top",
        timeout: 2000,
      });

      setTimeout(() => {
        emit("callback-closeDialog");
      }, 500);
    }
  });
});
</script>

<style lang="scss" scoped>
// #region Box
.box-backdrop-main{
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.5);
}

.box-dialog-get-reward {
  max-width: 340px;
  height: 600px;
}

.box-start-animation {
  width: clamp(375px,37.5cqw,600px);
}

.box-dialog-main {
  width: clamp(600px,60cqw,960px);
  height: clamp(375px,37.5cqw,600px);
  padding: clamp(5px,0.5cqw,8px);
  border-radius: clamp(10px,1cqw,16px);
  border: clamp(1.25px,0.125cqw,2px) solid #4a261b;
  background: #f2c043;
  box-sizing: border-box;
  color: #4a261b;

  &.box-get-reward-before-delete {
    width: 303px;
    min-width: 303px;
    height: 262px;
  }

  &.box-delete-read-all {
    width: 320px;
    min-width: 320px;
    height: fit-content;
    background: #f2c043;
  }

  &.box-delete-read {
    width: 300px;
    min-width: 300px;
    height: fit-content;
    background: #f2c043;
  }

  &.content-mailbox {
    width: 312px;
    min-width: 312px;
    height: 600px;
  }

  &.mobile {
    width: 304px;
    min-width: 304px;
    height: 516px;
    padding:8px;
    border-radius: 16px;
    border-width: 2px;
  }
}

.box-dialog-sub {
  width: 100%;
  height: 100%;
  padding: clamp(10px,1cqw,16px) clamp(7.5px,0.75cqw,12px) clamp(7.5px,0.75cqw,12px) clamp(7.5px,0.75cqw,12px);
  border-radius: clamp(5px,0.5cqw,8px);
  background: #ffedc4;

  &.box-get-reward-before-delete {
    width: 100%;
    height: 100%;
    padding: 32px 24px 24px 24px;
    line-height: 24px;
  }

  &.box-delete-read-all {
    width: 100%;
    height: 100%;
    padding: 32px 20px 24px 20px;
    line-height: 24px;
  }

  &.box-delete-read {
    width: 100%;
    height: 100%;
    padding: 32px 24px 24px 24px;
    line-height: 24px;
  }

  &.content-mailbox {
    width: 100%;
    height: 100%;
  }

  &.mobile {
    padding: 8px;
    height: 100%;
    overflow: hidden;
  }
}

.box-dialog-content {
  width: 100%;
  height: clamp(322.5px,32.25cqw,516px);
  padding: clamp(5px,0.5cqw,8px);
  border-radius: 0px clamp(5px,0.5cqw,8px) clamp(5px,0.5cqw,8px) clamp(5px,0.5cqw,8px);
  background: #efd080;

  &.mobile {
    height: 92.918%;
  }
}

.box-mailbox-list {
  height: 100%;
  padding-right: clamp(5px,0.5cqw,8px);

  &.mobile {
    padding-right: 0px;
  }
}

.box-mailbox-scroll {
  width: 100%;
  height: 90.5%;
  padding-right: clamp(2.5px,0.25cqw,4px);
  overflow-y: auto;

  &.mobile {
    height: 91.5%;
    padding-right: 0px;
  }

  & .text-no-mail{
    font-size:clamp(8.75px,0.875cqw,14px);
  }
}

.box-news-scroll {
  width: 100%;
  height: 100%;
  padding-right: clamp(2.5px,0.25cqw,4px);
  overflow-y: auto;

  &.mobile {
    height: 100%;
    overflow-y: auto;
    padding-right: 0px;
  }

  & .text-no-news{
    font-size:clamp(8.75px,0.875cqw,14px);
  }
}

.box-news-scroll::-webkit-scrollbar,
.box-mailbox-scroll::-webkit-scrollbar {
  width: 6px;
  height: 0px;
}

.box-news-scroll::-webkit-scrollbar-thumb,
.box-mailbox-scroll::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 8px;
}

.box-news-scroll::-webkit-scrollbar-track,
.box-mailbox-scroll::-webkit-scrollbar-track {
  background: #ffedc4;
  border-radius: 8px;
}

.box-news-image {
  width: 100%;
  border-radius: clamp(2.5px,0.25cqw,4px);
  overflow: hidden;
  margin: 0px 0px clamp(2.5px,0.25cqw,4px) 0px;

  &.mobile {
    margin: 0px 0px 4px 0px;
  }
}

.box-news-footer {
  padding: clamp(2.5px,0.25cqw,4px) clamp(2.5px,0.25cqw,4px) 0px clamp(2.5px,0.25cqw,4px);
  height: clamp(18.75px,1.875cqw,30px);

  &.mobile {
    padding: 0px 4px 0px 4px;
    height: 32.82px;
  }
}

.box-malibox-button {
  height: 10%;
  padding-top: clamp(5px,0.5cqw,8px);

  &.mobile {
    height: 10%;
    padding-top: 6px;
  }
}

.box-mailbox-details-container {
  width: clamp(270px,27cqw,432px);
  height: 100%;
  color: #4a261b;
  overflow: hidden;
}

.box-mailbox-details-main {
  width: 100%;
  height: 100%;
  border: clamp(1.25px,0.125cqw,2px) solid #ffedc4;
  border-radius: clamp(5px,0.5cqw,8px);
  font-size:clamp(8.75px,0.875cqw,14px);
  transition: border 1s ease-in;

  &.active {
    border: clamp(1.25px,0.125cqw,2px) solid #4a261b;
    background-color: #ffedc4;
    transition: border 0s;
  }
}

.box-mailbox-details-topic {
  height: clamp(40px,4cqw,64px);
  background: #4a261b;
  padding: clamp(7.5px,0.75cqw,12px) clamp(7.5px,0.75cqw,12px) clamp(7.5px,0.75cqw,12px) clamp(10px,1cqw,16px);
  color: #fff;

  &.content-mailbox {
    border-radius: 8px 8px 0px 0px;
  }

  & .text-detail-subject{
    font-size:clamp(8.75px,0.875cqw,14px);
    padding-right:xlamp(5px,0.5cqw,8px);
  }

  &.mobile {
    width:100%;
    padding: 12px 30px 12px 16px;
  }
}

.box-mailbox-content {
  width: 100%;
  height: calc(100% - clamp(40px,4cqw,64px));
  padding: clamp(7.5px,0.75cqw,12px) clamp(10px,1cqw,16px);

  &.content-mailbox {
    padding: clamp(7.5px,0.75cqw,12px) clamp(7.5px,0.75cqw,12px) 8px clamp(7.5px,0.75cqw,12px);
    border-radius: clamp(5px,0.5cqw,8px);
  }

  &.mobile {
    padding: 12px 12px 8px 12px;
    background: #ffedc4;
  }
}

.box-mailbox-content-header {
  height: 14%;

  &.mobile {
    height: 11.5%;
  }

  & .text-sender-detail{
    font-size:clamp(8.75px,0.875cqw,14px);
  }

  & .text-start-date{
    font-size:clamp(7.5px,0.75cqw,12px);
  }

  & .text-expire-date{
    font-size:clamp(6.25px,0.625cqw,10px);
  }

}

.box-mailbox-content-scroll {
  width: 100%;
  height: 57%;
  overflow: auto;

  &.mobile {
    height: 66%;
  }

  &.message {
    height: 85%;

    &.mobile {
      height: 81.5%;
    }
  }

  &::-webkit-scrollbar {
    width: clamp(3.75px,0.375cqw,6px);
  }

  &::-webkit-scrollbar-thumb {
    background: #4a261b;
    border-radius: 99px;
  }

  &::-webkit-scrollbar-track {
    background: #ffedc4;
  }
}

.box-mailbox-content-footer {
  height: 29%;

  &.mobile {
    height: 22%;
  }

  &.message {
    height: fit-content;
  }
}

.box-mailbox-content-reward {
  width: 100%;
  height: clamp(40px,4cqw,64px);
  border-radius: clamp(5px,0.5cqw,8px);
  background: #efd080;
  padding: clamp(5px,0.5cqw,8px);
  margin: clamp(5px,0.5cqw,8px) 0px;

  &.mobile {
    height: 60px;
    padding: 0px 0px;
  }
}

.box-icon-mailbox {
  width: clamp(32.5px,3.25cqw,52px);
  margin-right: clamp(5px,0.5cqw,8px);

  &.opened {
    opacity: 0.5;
  }
}

.box-mailbox-expire {
  margin-left: clamp(5px,0.5cqw,8px);
}

.box-line-separator {
  width: 100%;
  height: 1px;
  background: #4a261b;
  margin: clamp(5px,0.5cqw,8px) 0px;
}

.box-image-reward {
  width: 30%;
  margin: 1px;
}

.box-reward-iamge {
  top: 25%;
  width: 96px;
}

.box-button-ok-long {
  top: 83%;
  width: 144px;
}

.box-amount-reward {
  bottom: clamp(10px,1cqw,16px);
  width: 75%;
  border-radius: clamp(31.25px,3.125cqw,50px);
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  margin: auto;
  line-height: clamp(15px,1.5cqw,24px);
  font-size:clamp(7.5px,0.75cqw,12px);
}

.box-have-reward {
  bottom: clamp(7.5px,0.75cqw,12px);
  width: 100%;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.box-amount-have-reward {
  bottom: clamp(10px,1cqw,16px);
  width: clamp(46.875px,4.6875cqw,75px);
  height: clamp(12.5px,1.25cqw,20px);
  border-radius: clamp(31.25px,3.125cqw,50px);
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  line-height: 0px;
  margin-top: clamp(2.5px,0.25cqw,4px);
}

// #endregion

// #region button

.button-main {
  cursor: pointer;
  border: 0px solid transparent;

  &:not(.menu, .mailbox, .news, .disable):active {
    transform: scale(0.97);
    transition: transform 0.2s;
  }

  // delete read
  &.delete-read {
    width: clamp(85px,8.5cqw,136px);

    &.mobile {
      width: 99px;
    }
  }

  // claim all
  &.claim-all {
    width: clamp(197.5px,19.75cqw,316px);

    &.mobile {
      width: 145px;
    }
  }

  // menu
  &.menu {
    width: clamp(122.5px,12.25cqw,196px);
    height: clamp(22.5px,2.25cqw,36px);
    padding: clamp(6.25px,0.625cqw,10px) clamp(5px,0.5cqw,8px) clamp(5px,0.5cqw,8px) clamp(50px,5cqw,80px);
    border-radius: clamp(5px,0.5cqw,8px) clamp(5px,0.5cqw,8px) 0px 0px;
    background: #fff;
    font-size: clamp(8.75px,0.875cqw,14px);
    line-height: clamp(10px,1cqw,16px);

    &.active {
      background: #efd080;
    }

    &.mobile {
      width: fit-content;
      height: 34px;
      padding: 10px 10px 8px 56px;
      font-size: 12px;
      line-height: 20px;
    }
  }

  // mailbox
  &.mailbox {
    height: clamp(42.5px,4.25cqw,68px);
    padding: clamp(3.125px,0.3125cqw,5px) clamp(6.875px,0.6875cqw,11px) clamp(5.625px,0.5625cqw,9px) clamp(4.375px,0.4375cqw,7px);
    border-radius: clamp(5px,0.5cqw,8px);
    background: #fff;
    border: 1px solid #97a3ba;
    box-shadow: 0px clamp(-4px,-0.25cqw,-2.5px) 0px 0px #ced6e5 inset;
    margin-bottom: clamp(5px,0.5cqw,8px);

    &.active {
      color: #fff;
      background: #4a261b;
      border: 1px solid transparent;
      box-shadow: 0px clamp(-4px,-0.25cqw,-2.5px) 0px 0px #4a261b inset;
    }

    &.opened {
      border-radius: clamp(5px,0.5cqw,8px);
      background: #ffedc4;
      border: 1px solid transparent;
      box-shadow: 0px clamp(-4px,-0.25cqw,-2.5px) 0px 0px #ffedc4 inset;
    }

    & .text-subject{
      font-size:clamp(8.75px,0.875cqw,14px);
    }

    & .text-sender{
      font-size:clamp(6.25px,0.625cqw,10px);
      margin-top:clamp(5px,0.5cqw,8px);
    }

    &.mobile{
      height:68px;
      padding:8px 12px 8px 8px;
      border-radius: 8px;
      border:1px solid #97a3ba;
      box-shadow: 0px -4px 0px 0px #ced6e5 inset;
      margin-bottom: 8px;
    }
  }

  // news
  &.button-news {
    width: clamp(182.5px,18.25cqw,292px);
    height: clamp(143.75px,14.375cqw,230px);
    border-radius: clamp(5px,0.5cqw,8px);
    background-color: #fff;
    border: 1px solid #97a3ba;
    box-shadow: 0px clamp(-4px,-0.25cqw,-2.5px) 0px 0px #ced6e5 inset;
    margin-bottom: clamp(5px,0.5cqw,8px);
    padding: clamp(4.375px,0.4375cqw,7px) clamp(4.375px,0.4375cqw,7px) 0px clamp(4.375px,0.4375cqw,7px);

    &.mobile {
      width: 100%;
      height: 100%;
    }
  }

  // delete size s
  &.delete-size-s {
    width: clamp(20px,2cqw,32px);

    &.mobile{
      width:32px;
    }
  }

  &.button-claim-reward {
    width: 96px;
  }

  // cancel
  &.close {
    width: 46.62px;
    top: -16px;
    right: -16px;
  }

  // cancel delete mail
  &.cancel-delete-mail {
    width: 112px;

    &.all {
      margin: 0px 4px;
    }
  }

  &.button-cancel-purple {
    width: 112px;
  }

  &.button-get-reward {
    width: 112px;
  }

  &.delete-mail {
    width: 112px;

    &.all {
      margin: 0px 4px;
    }
  }

  // ok
  &.button-ok {
    width: 100px;
  }

  // disable
  &.disable {
    cursor: default;
  }
}

// #endregion button

// #region icon
.icon-mail-main {
  width: clamp(40px,4cqw,64px);
  left: clamp(5px,0.5cqw,8px);
  top: clamp(-12px,-0.75cqw,-7.5px);

  &.mobile {
    width: 50px;
    left: 3px;
    top: -2px;
  }
}

.icon-news-main {
  width: clamp(40px,4cqw,64px);
  left: clamp(5px,0.5cqw,8px);
  top: clamp(-12px,-0.75cqw,-7.5px);

  &.mobile {
    width: 50px;
    left: 5px;
    top: -3px;
  }
}

.icon-new-badge {
  width: clamp(28.125px,2.8125cqw,45px);
  right: clamp(5px,0.5cqw,8px);
  top: clamp(-10px,-0.625cqw,-6.25px);

  &.mobile {
    width: 12px;
    right: 8px;
    top: -8px;
  }
}

.icon-not-open {
  width: clamp(28.125px,2.8125cqw,45px);
  margin-left: clamp(5px,0.5cqw,8px);
  line-height:0;
}

.icon-checked {
  width: clamp(12.5px,1.25cqw,20px);
  margin-left: clamp(5px,0.5cqw,8px);
}
// #endregion icon

// #region text
.text-news-topic {
  width: 100%;
  height: clamp(15.625px,1.5625cqw,25px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: clamp(15.625px,1.5625cqw,25px);
  font-size:clamp(7.5px,0.75cqw,12px);
  margin-top: 0px;

  &.mobile {
    height: 16px;
    margin-top: -7px;
    line-height: 20px;
  }
}

.text-reward-info {
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
  line-height: 26px;
  margin: auto;
}

.text-plus-rotate {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%23000' d='M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4z'/%3E%3C/g%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;

  transform-origin: center;
  transform: rotate(-45deg);
}

.text-shadow-none {
  text-shadow: none;
}

.text-overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

// #endregion text
</style>
