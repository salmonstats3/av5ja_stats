<script setup lang="ts">
import { Http2ServerResponse } from "http2";
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>運営について</v-card-title>
        <v-card-text
          >Salmon Stats+はSalmonia3+で集められたデータの統計を表示するウェブサイトであり, その個人開発かつ無料で運営されています.
          将来的にも有料化する予定はありません(支援していただいた方への特別機能の実装は否定しません).</v-card-text
        >
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>無償運営の理由</v-card-title>
        <v-card-text
          >データの解析, 統計の分析にはデータの数が多ければ多いほどより正確に推定することができます.
          有料化してしまうとそもそも十分なデータ数が集まらなくなってしまいます.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>支援について</v-card-title>
        <v-card-text
          >とはいえ, 運営には開発コストや毎月のサーバー代などがかかっています. アプリ内の広告収入である程度まかなえてはいますが,
          ユーザー数のおよび利用者の増加で運営の継続が困難になってしまう可能性もあります.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card>
        <v-card-title><a href="https://www.paypal.com/paypalme/salmonia">PayPal.Me</a></v-card-title>
        <v-card-text>任意の金額の寄付ができます. </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card>
        <v-card-title
          ><a href="https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-5YR614358D8229313MAAAVNA">定期購読</a></v-card-title
        >
        <v-card-text>月々500円のサポートができます. </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card>
        <v-card-title><a href="https://www.amazon.co.jp/hz/wishlist/ls/1OVWKJ7C5R9XK">ほしいものリスト</a></v-card-title>
        <v-card-text
          >ほしいものリストを公開しています. 少額のものでも構いませんので何か送っていただけると開発の励みになります.
          頂いた際にはTwitterでお礼のツイートをしますが, 不要の場合は匿名希望とメッセージを添えていただけると助かります.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
