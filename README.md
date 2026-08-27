# Multi-Warehouse Management System (WMS) - Client

Çoklu depo yapısına sahip işletmeler için geliştirilen kapsamlı bir **Depo Yönetim Sistemi (WMS) frontend uygulamasıdır**.

Uygulama; ürün, depo, raf, stok, stok hareketleri, sayım, raflama ve kullanıcı yönetimi gibi temel depo operasyonlarını tek bir arayüz üzerinden yönetmek için geliştirilmiştir. Frontend, RESTful API ile entegre çalışmakta ve kullanıcı rollerine göre erişim yetkilerini yönetmektedir.

## 🚀 Özellikler

- 🔐 **Kimlik Doğrulama ve Yetkilendirme**
  - JWT tabanlı authentication
  - Access & Refresh Token yapısı
  - Rol bazlı yetkilendirme (RBAC)
  - SuperAdmin, WarehouseManager ve Staff rolleri
  - Route koruması ve yetkisiz erişim kontrolü

- 🏢 **Çoklu Depo Yönetimi**
  - Birden fazla depo yönetimi
  - Kullanıcının yetkili olduğu depolara göre veri erişimi
  - Depo, raf ve kapasite yönetimi

- 📦 **Ürün ve Stok Yönetimi**
  - Ürün oluşturma ve güncelleme
  - Stok takibi
  - Stok hareketlerinin görüntülenmesi
  - Kritik stok seviyelerinin takibi
  - Ürünlerin raflardaki konumlarının yönetimi

- 📊 **Akıllı Sayım (Inventory Count)**
  - Sistem stoğu ile fiziksel sayımın karşılaştırılması
  - Eksik ve fazla stokların tespit edilmesi
  - Sayım onay süreci
  - Sayım sonucuna göre stok hareketlerinin oluşturulması

- 📥 **Raflama (Putaway)**
  - Depoya gelen ürünlerin raflara yerleştirilmesi
  - Raf kapasitesi kontrolleri
  - Ürün ve raf bilgilerinin birlikte yönetilmesi

- 🔄 **Stok Operasyonları**
  - Stok giriş ve çıkış işlemleri
  - Depolar arası stok transferleri
  - Stok hareketlerinin takibi

- 🧩 **Modüler Mimari**
  - Servis ve type yapılarının domain bazlı ayrılması
  - Identity, Inventory, Definitions ve Documents gibi iş alanlarına göre modüler yapı
  - Tekrar kullanılabilir UI bileşenleri
  - Karmaşık bileşenlerin daha küçük alt bileşenlere ayrılması

## 🛠️ Kullanılan Teknolojiler

- **Framework:** Next.js
- **Language:** TypeScript
- **UI:** Material UI (MUI)
- **API Communication:** Axios
- **State Management:** React Hooks & Context API
- **Architecture:** Domain-based modular structure
- **Authentication:** JWT / HttpOnly Cookies

## 📂 Proje Yapısı

```text
src/
├── app/                    # Next.js App Router sayfaları
├── components/             # Tekrar kullanılabilir UI bileşenleri
│   └── products/
│       └── drawer/         # Product Detail alt bileşenleri
├── services/               # API servisleri
│   ├── identity/           # Kullanıcı ve authentication işlemleri
│   ├── inventory/          # Stok, sayım, raflama işlemleri
│   ├── definitions/        # Ürün, depo, raf ve kategori işlemleri
│   └── documents/          # Doküman işlemleri
├── types/                  # TypeScript tipleri ve DTO'lar
├── contexts/               # Global context yapıları
└── lib/                    # Yardımcı fonksiyonlar ve sabitler
```


## ⚙️ Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Çalışan WMS Backend API

### 1. Projeyi Klonlayın


git clone <repo-url>
cd <project-folder>


### 2. Paketleri Yükleyin
npm install

veya

yarn install

### 3. Environment Değişkenlerini Ayarlayın

Projenin ana dizininde `.env.local` dosyası oluşturun:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Backend API adresini kendi ortamınıza göre değiştirebilirsiniz.

### 4. Development Sunucusunu Başlatın

npm run dev


veya

yarn dev

Uygulama varsayılan olarak aşağıdaki adreste çalışacaktır:

http://localhost:3000

## 🔒 Güvenlik

- Route'lar middleware üzerinden korunmaktadır.
- Kullanıcı rolleri doğrulanarak yetkisiz sayfa erişimleri engellenmektedir.
- Authentication sürecinde JWT tabanlı token yapısı kullanılmaktadır.
- Hassas environment değişkenleri `.gitignore` içerisinde tutulmaktadır.
- Backend tarafından uygulanan iş kuralları, frontend tarafında da kullanıcı deneyimini iyileştirmek amacıyla kontrol edilmektedir.

## 🧱 Mimari Yaklaşım

Frontend tarafında servisler ve veri tipleri doğrudan tek bir klasörde toplanmak yerine **iş alanlarına göre ayrılmıştır**.

Örneğin:

```text
services/
├── identity/
├── inventory/
├── definitions/
└── documents/
```

Bu yapı sayesinde her domain kendi servisleri ve tipleriyle birlikte yönetilebilir. Yeni bir modül eklendiğinde mevcut yapıyı karmaşıklaştırmadan ilgili domain altında geliştirme yapılabilir.

Ayrıca büyük ve karmaşık UI bileşenleri daha küçük parçalara ayrılarak componentlerin okunabilirliği ve bakımı kolaylaştırılmıştır.

## 📌 İş Kuralları

Frontend tarafında kullanıcı hatalarını azaltmak için çeşitli iş kuralları uygulanmaktadır.

Örneğin:

- Stok bulunan ürünlerin silinmesi engellenir.
- Raf içerisinde stok bulunuyorsa ilgili rafın silinmesi engellenir.
- Depo içerisindeki aktif rafların durumuna göre silme işlemleri kontrol edilir.
- Kullanıcının rolüne göre yapabileceği işlemler sınırlandırılır.
- Kullanıcının yetkili olmadığı depolara erişmesi engellenir.
- Raflama sırasında raf kapasitesi ve ürün bilgileri kontrol edilir.

## 🔗 Backend

Bu frontend uygulaması, ayrı olarak geliştirilen **WMS Backend API** ile birlikte çalışmaktadır.

Frontend ve backend arasındaki iletişim RESTful API üzerinden gerçekleştirilmektedir.

API adresi `.env.local` üzerinden değiştirilebilir:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

## 📄 License

This project was developed for educational and software engineering purposes.
