# ionicphpRestApi

<application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">

Android cihazda test etmek isterseniz manifest dosyası içine application alanına android:usesCleartextTraffic="true" satırının eklenmesi gerekmektedir.
  
rest.service.ts dosyası içinde bulunan apiURL değişkeninin PHP sunucu adresi olarak güncellenmesi gerekmektedir.
