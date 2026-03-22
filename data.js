const EXAM_DATA = [
  {
    id: '1-1',
    title: '1. Dönem 1. Sınav',
    summary: `<h3 style="color:var(--primary); margin-top:0;">1. Ünite: Oyunun Temelleri ve Kod Mantığı</h3>
<p style="margin-bottom:15px; font-style:italic; color:var(--text-dim);">Bu sınavda oyun motorunun fiziksel dünyası ile C# kodlama dilinin nasıl el sıkıştığını bilmen gerekir.</p>

<strong style="color:var(--accent);">1. Arayüzün Efendileri</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Sahnenin iskeleti <b>Hierarchy</b> (nesne listesi) panelinde kurulur, ruhu ise <b>Inspector</b> (özellikler) panelinde şekillenir.</li>
  <li>Proje dosyaların <b>Project</b> penceresinde dururken, tüm görsel tasarımı <b>Scene</b> ekranında yaparsın.</li>
</ul>

<strong style="color:var(--accent);">2. Fizik Dünyası (Physics)</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Bir nesnenin "ağırlığı olsun, yere düşsün" diyorsan ona mutlaka <b>Rigidbody</b> bileşeni eklemelisin.</li>
  <li>Nesnelerin birbirine çarpmasını sağlayan katı sınır hattı <b>Collider</b>'dır.</li>
  <li>Eğer bir nesnenin içinden geçilsin ama geçtiği an bir olay tetiklensin istiyorsan, Collider üzerindeki "<b>Is Trigger</b>" seçeneğini aktif etmelisin.</li>
</ul>

<strong style="color:var(--accent);">3. Kodun Kalbi (C#) ve Veri Tipleri</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li><code>void Start()</code> oyun açıldığında sadece bir kez çalışır ve değişkenleri hazırlar.</li>
  <li><code>void Update()</code> ise oyunun her karesinde sürekli çalışır; oyuncunun tuş basışlarını buradan kontrol edersin.</li>
  <li>Sayılar için <b>int</b> veya <b>float</b>, yazılar için <b>string</b>, durumlar için <b>bool</b> kullanırız. Oyunun gidişatını <b>if-else</b> yapısıyla yönetiriz.</li>
</ul>`,
    questions: [
      { q: "Nesnelerin yerçekimi gibi fiziksel kurallara uymasını sağlayan bileşen nedir?", a: "Rigidbody." },
      { q: "Çarpışma alanlarını belirleyen bileşen hangisidir?", a: "Collider." },
      { q: "Update() metodunun görevi nedir?", a: "Her karede (frame) kodları tekrar çalıştırmak." },
      { q: "Bir değişkeni Unity editörü içinden görünür kılmak için hangi komut kullanılır?", a: "[SerializeField]." },
      { q: "int sayi = Random.Range(0, 10); kodu ne üretir?", a: "0 ile 9 arasında rastgele bir tamsayı." },
      { q: "Nesneleri kod ile sahneden silmek için hangi metot kullanılır?", a: "Destroy()." },
      { q: "for döngüsünün temel amacı nedir?", a: "Belirli bir işlemi istenilen sayıda tekrarlamak." },
      { q: "Projeye dışarıdan model veya ses eklemek için hangi klasör kullanılır?", a: "Assets." },
      { q: "İki nesne çarpıştığında çalışan metot nedir?", a: "OnCollisionEnter." },
      { q: "Bir nesnenin koordinat bilgilerini tutan bileşen hangisidir?", a: "Transform." }
    ],
    flashcards: [
      { front: "Rigidbody", back: "Fizik motoru bileşeni." },
      { front: "Collider", back: "Çarpışma sınırlayıcı." },
      { front: "Start()", back: "Oyun başı bir kez çalışan metot." },
      { front: "Update()", back: "Her karede çalışan metot." },
      { front: "Destroy()", back: "Nesneyi silme komutu." },
      { front: "[SerializeField]", back: "Değişkeni panelde gösterir." },
      { front: "int", back: "Tam sayı tipi." },
      { front: "float", back: "Ondalıklı sayı tipi." },
      { front: "bool", back: "Doğru/Yanlış tipi." },
      { front: "string", back: "Metin tipi." },
      { front: "Hierarchy", back: "Sahnedeki nesne listesi." },
      { front: "Inspector", back: "Nesne özellikleri paneli." },
      { front: "Project Window", back: "Dosya yönetim alanı." },
      { front: "Scene", back: "Tasarım alanı." },
      { front: "Transform", back: "Konum, dönüş, boyut." },
      { front: "OnCollisionEnter", back: "Çarpışma anında tetiklenir." },
      { front: "OnTriggerEnter", back: "İçinden geçme anında tetiklenir." },
      { front: "Assets", back: "Proje kaynak dosyaları." },
      { front: "If-Else", back: "Mantıksal karar yapısı." },
      { front: "Console", back: "Hata ve mesaj penceresi." }
    ],
    openEndedQuestions: [
      { q: "Unity arayüzündeki Hierarchy ve Inspector panellerinin kullanım amaçlarını detaylandırarak açıklayınız.", a: "Hierarchy paneli, o anki sahnede bulunan tüm oyun nesnelerinin (GameObject) listelendiği ve nesneler arasındaki alt-üst (parent-child) ilişkisinin yönetildiği alandır. Inspector paneli ise Hierarchy üzerinden seçilen bir nesnenin sahip olduğu Transform, Renderer, Rigidbody gibi tüm bileşenleri ve bu bileşenlerin değiştirilebilir özelliklerini detaylıca görmemizi ve düzenlememizi sağlar." },
      { q: "Bir oyun nesnesine Rigidbody bileşeni eklendiğinde nesne hangi fiziksel özellikleri kazanır?", a: "Rigidbody bileşeni, bir nesnenin Unity fizik motoru tarafından kontrol edilmesini sağlayarak ona yerçekimi, kütle, hava direnci ve sürtünme gibi özellikler kazandırır. Bu bileşen sayesinde nesneye kod üzerinden kuvvet (Force) veya tork uygulanabilir, böylece nesnenin fizik kurallarına uygun şekilde hareket etmesi sağlanır." },
      { q: "Collider bileşeni ile \"Is Trigger\" özelliği arasındaki ilişkiyi ve kullanım amacını açıklayınız.", a: "Collider, bir nesnenin fiziksel sınırlarını belirleyerek diğer nesnelerle çarpışmasını sağlar; ancak \"Is Trigger\" seçeneği işaretlendiğinde nesne fiziksel bir engel oluşturmayı bırakır ve içinden geçilebilir hale gelir. Trigger özelliği, genellikle bir oyuncunun belirli bir alana (örn: kapı önü veya ödül bölgesi) girdiğini algılamak ve kod tarafında bir olay tetiklemek için kullanılır." },
      { q: "C# programlamada Start() ve Update() metotlarının çalışma prensiplerini karşılaştırınız.", a: "Start() metodu, nesne sahneye yüklendiğinde ve oyun başladığında sadece bir kez çalıştırılır, bu nedenle değişkenleri başlatmak (initialization) için idealdir. Update() metodu ise oyunun her karesinde (frame) bir kez çalışır; bu da saniyede ortalama 60-120 kez çalışması anlamına gelir ve oyuncu girdilerini kontrol etmek veya sürekli hareketleri yönetmek için kullanılır." },
      { q: "[SerializeField] komutunun kod yazımındaki avantajı nedir?", a: "Bu komut, kod içerisinde \"private\" (gizli) olarak tanımlanmış bir değişkenin Unity editöründeki Inspector panelinde görünmesini ve kod dosyasını açmadan düzenlenebilmesini sağlar. Bu durum, tasarımcıların kodun mantığını bozmadan oyun içindeki hız, güç gibi değerleri kolayca test etmesine olanak tanır." },
      { q: "Destroy(gameObject, 5f); kod satırının işlevini ve parametresini açıklayınız.", a: "Destroy metodu, parantez içindeki nesneyi sahneden ve bellekten tamamen silmek için kullanılır. Buradaki gameObject silinecek nesneyi, yanındaki 5f değeri ise nesnenin kod çalıştıktan tam 5 saniye sonra silineceğini belirten gecikme süresidir." },
      { q: "Transform bileşeni hangi üç temel veriyi tutar ve bunlar oyun dünyasında neyi ifade eder?", a: "Transform bileşeni nesnenin Position (Dünya koordinatlarındaki konumu), Rotation (Hangi açıda durduğu) ve Scale (X, Y, Z eksenlerindeki boyut çarpanı) bilgilerini tutar. Sahne üzerindeki her nesnenin en az bir Transform bileşeni olmak zorundadır çünkü bu bileşen nesnenin uzaydaki varlığını belirler." },
      { q: "OnCollisionEnter metodunun tetiklenmesi için nesnelerde bulunması gereken şartlar nelerdir?", a: "Bu metodun çalışabilmesi için çarpışan her iki nesnenin de birer Collider bileşenine sahip olması ve nesnelerden en az birinin fizik hesaplamalarına dahil olan bir Rigidbody bileşeni taşıması gerekir. Ayrıca nesnelerin Collider'larındaki \"Is Trigger\" seçeneğinin kapalı olması şarttır." },
      { q: "Değişken türlerinden int, float ve bool arasındaki farkları kullanım alanlarıyla açıklayınız.", a: "int, 10, -5 gibi tamsayıları tutar ve genellikle mermi sayısı veya puan gibi değerler için kullanılır. float, 1.5f, 0.75f gibi ondalıklı sayıları tutar ve hız, süre veya mesafe hesaplamalarında tercih edilir. bool ise sadece true (doğru) veya false (yanlış) değerlerini alabilir ve karakterin ölü olup olmaması gibi durum kontrollerinde kullanılır." },
      { q: "Unity'de \"Assets\" klasörünün oyun projesindeki rolü nedir?", a: "Assets klasörü, oyunun geliştirilmesinde kullanılan tüm dış kaynakların (modeller, ses dosyaları, C# kodları, materyaller, resimler) saklandığı ana kütüphanedir. Projeye dışarıdan eklenen her dosya bu klasöre aktarılır ve oyun motoru bu dosyaları burada organize eder." }
    ]
  },
  {
    id: '1-2',
    title: '1. Dönem 2. Sınav',
    summary: `<h3 style="color:var(--primary); margin-top:0;">2. Ünite: Görsel Dünya ve Kullanıcı Etkileşimi</h3>
<p style="margin-bottom:15px; font-style:italic; color:var(--text-dim);">Bu sınavda oyunun "vitrini" olan arayüz (UI) ve nesnelerin nasıl göründüğü (Materyal/Işık) ön plandadır.</p>

<strong style="color:var(--accent);">1. Arayüz Mimarisi (UI)</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Ekrandaki tüm butonlar, skor yazıları ve paneller bir <b>Canvas</b> yapısı üzerinde yaşar.</li>
  <li>Kullanıcıdan bilgi almak için <b>Input Field</b>, daha kaliteli yazılar için <b>TextMeshPro</b> kullanırız.</li>
</ul>

<strong style="color:var(--accent);">2. Materyal ve Işık Sanatı</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Nesnelerin rengini ve dokusunu <b>Albedo</b> belirlerken, parlamasını <b>Metallic</b> ve <b>Smoothness</b> ile kontrol ederiz.</li>
  <li>Sahnemizi güneş gibi aydınlatan ana ışık kaynağı <b>Directional Light</b>'tır.</li>
</ul>

<strong style="color:var(--accent);">3. 2D Tasarım ve Veri</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>2D dünyadaki resim dosyalarına <b>Sprite</b> denir; zeminleri hızlıca oluşturmak için <b>Tilemap</b> sistemini kullanırız.</li>
  <li>Büyük veri setlerini (örn: 100 soru) oyun içinde saklamak ve okumak için <b>JSON</b> dosya formatından yararlanırız.</li>
</ul>`,
    questions: [
      { q: "UI nesnelerinin üzerinde durduğu temel yapı nedir?", a: "Canvas." },
      { q: "2D görsellere oyun motorunda ne ad verilir?", a: "Sprite." },
      { q: "Bir nesnenin yüzey görünümünü ve dokusunu belirleyen yapı nedir?", a: "Materyal." },
      { q: "Tüm sahneyi eşit şekilde aydınlatan ışık türü hangisidir?", a: "Directional Light." },
      { q: "Tilemap ne işe yarar?", a: "Kare tabanlı zemin ve harita tasarımı yapmaya yarar." },
      { q: "Kullanıcıdan metin girişi almak için hangi UI nesnesi kullanılır?", a: "Input Field." },
      { q: "Oyundaki kameraların temel görevi nedir?", a: "Sahneyi oyuncunun göreceği şekilde görüntülemek." },
      { q: "JSON formatı oyunlarda genellikle ne için kullanılır?", a: "Veri saklama ve soru okuma." },
      { q: "Butonlara tıklayınca işlem yapması için hangi bileşen eklenir?", a: "OnClick()." },
      { q: "Materyal saydamlığı nereden ayarlanır?", a: "Rendering Mode > Transparent." }
    ],
    flashcards: [
      { front: "Canvas", back: "Arayüz temel düzlemi." },
      { front: "Sprite", back: "2D resim dosyası." },
      { front: "Tilemap", back: "Izgara tabanlı harita sistemi." },
      { front: "Material", back: "Nesne kaplaması." },
      { front: "Albedo", back: "Materyal ana rengi/dokusu." },
      { front: "Directional Light", back: "Güneş tipi ışık." },
      { front: "Camera", back: "Görüntüleme objesi." },
      { front: "Input Field", back: "Metin giriş kutusu." },
      { front: "Button", back: "Etkileşimli buton." },
      { front: "Texture", back: "Dosya üzerindeki resim dokusu." },
      { front: "Smoothness", back: "Yüzey pürüzsüzlüğü." },
      { front: "Metallic", back: "Metalik görünüm oranı." },
      { front: "Opaque", back: "Işık geçirmeyen mod." },
      { front: "Skybox", back: "Gökyüzü kaplaması." },
      { front: "Event System", back: "UI etkileşim yönetimi." },
      { front: "Prefab", back: "Hazır nesne şablonu." },
      { front: "Point Light", back: "Noktasal ışık kaynağı." },
      { front: "Spot Light", back: "Fener tipi ışık kaynağı." },
      { front: "RGB", back: "Renk uzayı kütüphanesi." },
      { front: "Scene Management", back: "Sahne geçiş kontrolü." }
    ],
    openEndedQuestions: [
      { q: "Canvas nesnesi nedir ve UI (Kullanıcı Arayüzü) elemanları için neden gereklidir?", a: "Canvas, ekrandaki tüm arayüz elemanlarının (butonlar, metinler, paneller) üzerinde durduğu ve ekrana nasıl yansıtılacağını belirleyen temel düzlemdir. Bir nesnenin UI elemanı olarak çalışabilmesi için hiyerarşide mutlaka bir Canvas nesnesinin altında yer alması gerekir; aksi takdirde ekranda görüntülenemez." },
      { q: "2D oyunlarda \"Sprite\" kavramını ve kullanımını açıklayınız.", a: "Sprite, 2D oyun dünyasında kullanılan ve karakterlerden arka planlara kadar her türlü görseli temsil eden iki boyutlu resim dosyalarıdır. Sprite'lar, Sprite Renderer bileşeni aracılığıyla sahnede görüntülenir ve genellikle animasyon karelerini oluşturmak için bir dizi halinde kullanılırlar." },
      { q: "Unity'de \"Tilemap\" sistemi ile harita tasarlamanın avantajları nelerdir?", a: "Tilemap, küçük resim parçalarını (Tile) bir ızgara (Grid) üzerine yerleştirerek büyük haritalar tasarlamamızı sağlar. Bu sistem, her bir parçayı elle yerleştirmek yerine boyama yapar gibi hızlıca zeminler oluşturmamıza imkan tanıyarak hem zaman tasarrufu sağlar hem de oyun performansını artırır." },
      { q: "Bir materyalin (Material) bir nesne üzerindeki etkisini \"Albedo\" ve \"Metallic\" kavramları üzerinden açıklayınız.", a: "Materyaller nesnelerin yüzey görünümünü belirler; Albedo kısmı nesnenin ana rengini veya üzerine giydirilen ana doku resmini temsil eder. Metallic değeri ise yüzeyin ne kadar metalik (yansıtıcı) görüneceğini belirler; değer arttıkça yüzey ışığı daha sert yansıtır ve metal benzeri bir doku kazanır." },
      { q: "Sahnede \"Directional Light\" ışık türünün karakteristik özellikleri nelerdir?", a: "Directional Light, güneş ışığını simüle eder ve sahnede bulunduğu konumdan bağımsız olarak tüm nesnelere sonsuz bir mesafeden tek bir yönde ışık gönderir. Bu ışık türü tüm sahneyi eşit şekilde aydınlatır ve nesnelerin gölgelerinin aynı açıyla oluşmasını sağlar." },
      { q: "\"PlayerPrefs\" sınıfı ile veri kaydetme işleminin sınırlılıklarını ve kullanım amacını açıklayınız.", a: "PlayerPrefs, kullanıcı adı, en yüksek skor veya ses seviyesi gibi basit verileri bilgisayarın kayıt defterine kalıcı olarak kaydetmek için kullanılır. Ancak büyük veri grupları veya güvenlik gerektiren şifreleme işlemleri için uygun değildir; sadece küçük çaplı ayarları saklamak için tasarlanmıştır." },
      { q: "JSON formatındaki bir veriyi Unity içinde okumak için izlenen temel kod akışını açıklayınız.", a: "İlk olarak JSON dosyası bir TextAsset olarak projeye yüklenir ve içeriği string bir değişkene aktarılır. Ardından JsonUtility veya Newtonsoft.Json kütüphanesi kullanılarak bu string veri, koddaki ilgili sınıf (class) yapılarına dönüştürülür ve oyun içinde kullanılabilir hale gelir." },
      { q: "Kullanıcıdan metin girişi almak için kullanılan \"Input Field\" bileşeninin temel olaylarını (events) açıklayınız.", a: "Input Field, kullanıcının klavye ile yazı yazabileceği bir alandır ve genellikle \"On Value Changed\" (yazı her değiştiğinde) ile \"On End Edit\" (yazma bitip enter'a basıldığında) olaylarını tetikler. Bu olaylar aracılığıyla kullanıcının girdiği isim veya şifre gibi bilgiler anlık olarak yakalanıp kod tarafına gönderilir." },
      { q: "TextMeshPro (TMP) bileşeninin standart \"Text\" bileşenine göre sunduğu üstünlükler nelerdir?", a: "TextMeshPro, metinleri pikseller yerine matematiksel eğrilerle (SDF) oluşturduğu için metne ne kadar yaklaşılırsa yaklaşılsın görüntü bozulmaz. Ayrıca metinlere gölge, parlama, dış hat (outline) gibi gelişmiş görsel efektlerin doğrudan Inspector üzerinden verilmesine olanak tanır." },
      { q: "Bir oyuna çoklu kamera (Multi-Camera) sistemi eklemenin oynanışa katkıları neler olabilir?", a: "Birden fazla kamera kullanımı, oyuncunun ekranında aynı anda farklı açılar görmesini (örn: mini harita, dikiz aynası) veya belirli olaylar anında farklı bakış açılarına geçiş yapmayı sağlar. Her kamera için belirlenen \"Viewport Rect\" ayarları ile ekranın hangi bölgesinde hangi kameranın görüntüsünün olacağı ayarlanabilir." }
    ]
  },
  {
    id: '2-1',
    title: '2. Dönem 1. Sınav',
    summary: `<h3 style="color:var(--primary); margin-top:0;">3. Ünite: Animasyon, Efekt ve Çevre Tasarımı</h3>
<p style="margin-bottom:15px; font-style:italic; color:var(--text-dim);">Karakterlerin canlandığı, patlamaların koptuğu ve arazinin şekillendiği bölümdür.</p>

<strong style="color:var(--accent);">1. Animasyon Yönetimi</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Karakterin animasyonları arası akış şemasını sağlayan yapıya <b>Animator Controller</b> denir.</li>
  <li>Geçişlerin beklemeden, anında olması için "<b>Has Exit Time</b>" seçeneği kapatılmalıdır.</li>
</ul>

<strong style="color:var(--accent);">2. Gerçekçi Tepkiler</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Karakterlerin vurulduktan sonra fizik kurallarına göre gerçekçi yığılması için <b>Ragdoll</b> sistemi aktif edilir.</li>
  <li>Nesneleri kodla çok yumuşak bir şekilde hareket ettirmek için <b>DOTween</b> gibi kütüphaneler kullanılır.</li>
</ul>

<strong style="color:var(--accent);">3. Çevre Tasarımı ve Efektler</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Dağlar ve vadiler oluşturmak, yüzeyi boyamak ve ağaç dikmek için <b>Terrain</b> aracını kullanırız.</li>
  <li>Patlama, toz, duman veya kar gibi görsel efektlerin tümü <b>Particle System</b> ile üretilir.</li>
</ul>`,
    questions: [
      { q: "Animasyonlar arasındaki geçişleri yöneten yapı nedir?", a: "Animator Controller." },
      { q: "Particle System nedir?", a: "Parçacık efektleri oluşturma sistemi." },
      { q: "Karakterin beklemekten koşmaya geçmesi için ne kullanılır?", a: "Animasyon durumları (States) ve geçişler." },
      { q: "Terrain aracıyla ne yapılabilir?", a: "Arazi, dağ, ağaç düzenlemeleri." },
      { q: "Animasyonu kod ile kontrol etmek için neye erişilir?", a: "GetComponent<Animator>()." },
      { q: "Has Exit Time ne anlama gelir?", a: "Animasyonun bitmeden diğerine geçip geçemeyeceği." },
      { q: "Nesne yok olma süresi kodla nasıl verilir?", a: "Destroy(nesne, sure);" },
      { q: "Model boyutlarını değiştiren Transform değeri nedir?", a: "Scale." },
      { q: "Karakter seçimi genellikle nerede saklanır?", a: "PlayerPrefs." },
      { q: "Unity'de 3D vektör sınıfı nedir?", a: "Vector3." }
    ],
    flashcards: [
      { front: "Animator", back: "Animasyon oynatıcı bileşen." },
      { front: "Animator Controller", back: "Animasyon akış şeması." },
      { front: "Animation State", back: "Bekleme, koşma vb. durum." },
      { front: "Transition", back: "Durumlar arası geçiş yolu." },
      { front: "Condition", back: "Geçiş için gereken şart." },
      { front: "Particle System", back: "Toz, duman, ateş efekti." },
      { front: "Terrain", back: "Arazi oluşturma aracı." },
      { front: "Paint Terrain", back: "Yükselti oluşturma fırçası." },
      { front: "Raise/Lower", back: "Dağ/vadi yapma aracı." },
      { front: "Paint Texture", back: "Araziyi boyama işlemi." },
      { front: "Cinematics", back: "Ara sahneler." },
      { front: "DOTween", back: "Akıcı kod animasyonları." },
      { front: "Ragdoll", back: "Fiziksel yığılma sistemi." },
      { front: "SetLoops", back: "Animasyon tekrar sayısı." },
      { front: "SetEase", back: "Hareket ivmesi ayarı." },
      { front: "Vector3", back: "X, Y, Z koordinat yapısı." },
      { front: "GetComponent", back: "Bileşen erişim komutu." },
      { front: "Has Exit Time", back: "Animasyon bitiş bekletmesi." },
      { front: "Opacity", back: "Efekt şeffaflığı şeffaflık ayarı." },
      { front: "Model", back: "3D nesne tasarımı." }
    ],
    openEndedQuestions: [
      { q: "\"Animator Controller\" penceresindeki \"States\" (Durumlar) ve \"Transitions\" (Geçişler) arasındaki ilişkiyi açıklayınız.", a: "States, karakterin sahip olduğu \"Bekleme\", \"Koşma\" veya \"Zıplama\" gibi bireysel animasyon kliplerini temsil eder. Transitions ise bu durumlar arasındaki oklarla gösterilen yollardır; karakterin hangi şartlar altında bir animasyondan diğerine geçeceğini belirler." },
      { q: "Animasyon geçişlerinde kullanılan \"Parameters\" (Parametreler) türlerini ve işlevlerini açıklayınız.", a: "Geçişleri kontrol etmek için Float (hız kontrolü), Int (belirli bir durum numarası), Bool (koşuyor mu? true/false) ve Trigger (tek seferlik olaylar, örn: ateş etme) parametreleri kullanılır. Kod tarafında bu değerler güncellendiğinde, Animator Controller otomatik olarak uygun animasyona geçiş yapar." },
      { q: "\"Particle System\" bileşeninde mermi veya patlama efekti oluştururken kullanılan temel modülleri açıklayınız.", a: "Emission modülü, saniyede kaç tane parçacık çıkacağını belirler; Shape modülü, parçacıkların hangi geometrik formda (konu, küre vb.) yayılacağını ayarlar. Size over Lifetime ve Color over Lifetime gibi modüller ise parçacıkların havada kaldığı süre boyunca boyut ve renk değiştirmesini sağlayarak gerçekçiliği artırır." },
      { q: "Unity'de \"Terrain\" aracı ile arazi oluşturma ve detaylandırma süreçlerini açıklayınız.", a: "Terrain aracıyla önce \"Raise/Lower\" fırçası kullanılarak dağlar ve vadiler oluşturulur, ardından \"Paint Texture\" ile zemine çimen, kaya veya kum gibi dokular boyanır. \"Paint Trees\" ve \"Paint Details\" seçenekleri ise sahneye hızlıca ağaçlar, çalılar ve otlar ekleyerek arazinin doğal bir görünüm kazanmasını sağlar." },
      { q: "Bir animasyon geçişindeki \"Has Exit Time\" özelliğinin açık veya kapalı olmasının sonuca etkisini açıklayınız.", a: "Eğer \"Has Exit Time\" işaretliyse, mevcut animasyon klibi bitmeden diğer animasyona geçiş yapılmaz. Eğer bu seçenek kapalıysa, belirlenen koşul (condition) sağlandığı anda mevcut animasyon yarıda kesilir ve beklemeden anında yeni animasyona geçilir." },
      { q: "\"Ragdoll\" sistemi karakterlere nasıl bir fiziksel davranış kazandırır?", a: "Ragdoll sistemi, karakterin her bir uzvuna (kol, bacak, gövde) otomatik olarak Collider ve Rigidbody bileşenleri ekleyerek onları birbirine eklemlerle bağlar. Bu sayede karakter öldüğünde veya düştüğünde önceden kaydedilmiş bir animasyon oynamak yerine, fizik kurallarına göre gerçekçi bir şekilde yere yığılır." },
      { q: "DOTween kütüphanesini kullanarak bir nesneyi kodla hareket ettirmenin standart Unity hareket kodlarından farkı nedir?", a: "Standart kodlarda nesnenin konumunu her karede matematiksel olarak güncellemek gerekirken, DOTween ile transform.DOMove(hedef, sure) gibi tek satırlık bir komutla nesne yumuşak bir şekilde hareket ettirilebilir. Ayrıca hareketin ivmesini (Ease) ve tekrar sayısını (Loops) ayarlamak çok daha pratiktir." },
      { q: "Oyun içi \"Sinematik\" (Cinematics) yapılarının hikaye anlatımındaki rolünü ve nasıl oluşturulduğunu açıklayınız.", a: "Sinematikler, oyuncunun kontrolünü geçici olarak devralıp hikayeyi anlatan ara sahnelerdir; genellikle UI üzerindeki hikaye pencereleri, özel kamera açıları ve zamanlanmış animasyonlarla oluşturulurlar. Bu sahneler oyuncuya görevleri bildirmek veya oyunun atmosferini güçlendirmek için kullanılır." },
      { q: "Bir karakterin aracın içine girmesini veya bir nesneyi kullanmasını kod tarafında nasıl yönetirsiniz?", a: "Karakter araca yaklaştığında bir tuşa (örn: E tuşu) basılması algılanır; ardından karakterin kendi kontrolcü bileşenleri (ThirdPersonUserControl, Animator) kapatılır ve aracın kontrolcü bileşenleri (CarUserControl) aktif hale getirilir. Aynı zamanda kamera hedefi oyuncudan araca kaydırılır." },
      { q: "Modelleme Modu (Modeling Mode) ile dışarıdan bir 3D programı kullanmadan Unity içinde neler yapılabilir?", a: "Modelleme modu, Unity editörü içinden temel geometrik şekilleri (küp, küre, silindir vb.) kullanarak basit 3D modeller, duvarlar veya dekoratif nesneler oluşturmamıza olanak tanır. Bu özellik, dışarıdan model aktarma ihtiyacını azaltarak hızlı prototipleme yapmayı sağlar." }
    ]
  },
  {
    id: '2-2',
    title: '2. Dönem 2. Sınav',
    summary: `<h3 style="color:var(--primary); margin-top:0;">4. Ünite: Yapay Zeka ve Yayınlama Süreci</h3>
<p style="margin-bottom:15px; font-style:italic; color:var(--text-dim);">Oyunun bittiği, düşmanların zekileştiği ve dünyanın geri kalanıyla paylaşıldığı final aşamasıdır.</p>

<strong style="color:var(--accent);">1. Akıllı Düşmanlar (AI)</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Düşmanların engellere çarpmadan yolu bulmasını sağlayan navigasyon sistemine <b>NavMesh</b> denir.</li>
  <li>AI'nın karmaşık kararlar vermesini (Saldır/Kaç) <b>Davranış Ağaçları (Behavior Trees)</b> ile yönetiriz.</li>
</ul>

<strong style="color:var(--accent);">2. Ses ve Multiplayer</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Ses yaymak için <b>Audio Source</b> (hoparlör), sesleri duymak için <b>Audio Listener</b> (kulak) şarttır.</li>
  <li>Ağ maçlarında <b>Photon (PUN)</b> kullanılır; <code>photonView.IsMine</code> kontrolüyle sadece kendi karakterimizi yönetiriz.</li>
</ul>

<strong style="color:var(--accent);">3. Paketleme ve Optimizasyon (Build)</strong>
<ul style="margin-top:5px; margin-bottom:15px; padding-left:20px;">
  <li>Oyun bitince <b>Profiler</b> penceresiyle performans testi yapar; kasan yerleri saptarız.</li>
  <li>Son olarak <b>Build Settings</b> üzerinden hedef platformu (Android, Windows vb.) seçerek oyunun kurulum dosyasını alırız.</li>
</ul>`,
    questions: [
      { q: "Yapay zekanın sahnede yürüyeceği alanı belirleyen sistem nedir?", a: "NavMesh." },
      { q: "Oyun performansını izleyen panel nedir?", a: "Profiler." },
      { q: "Oyunu son kullanıcıya sunma işlemine ne denir?", a: "Paketleme (Build)." },
      { q: "Ses mesafesini ayarlayan bileşenler nelerdir?", a: "Audio Source ve Listener." },
      { q: "Reklam eklemek için hangi servis yaygındır?", a: "Google AdMob." },
      { q: "AI karar mekanizmasını yöneten yapı nedir?", a: "Davranış Ağaçları." },
      { q: "Time.deltaTime neden kullanılır?", a: "Hareketi saniye bazlı sabitlemek için." },
      { q: "Çok oyunculu sistemler için hangi kütüphane yaygındır?", a: "Photon (PUN)." },
      { q: "Yazılım hatalarına ne ad verilir?", a: "Bug." },
      { q: "Mobil çıktı platformu Build Settings'te nasıl seçilir?", a: "Android veya iOS." }
    ],
    flashcards: [
      { front: "NavMesh", back: "AI navigasyon ağı." },
      { front: "Behavior Tree", back: "AI karar ağacı." },
      { front: "Audio Source", back: "Ses çıkış kaynağı." },
      { front: "Audio Listener", back: "Sesi duyan kulak." },
      { front: "Build Settings", back: "Paketleme ayarları." },
      { front: "Profiler", back: "Performans analiz paneli." },
      { front: "Optimization", back: "Hızlandırma iyileştirmesi." },
      { front: "Google AdMob", back: "Mobil reklam servisi." },
      { front: "Banner Ad", back: "Küçük reklam bandı." },
      { front: "Interstitial Ad", back: "Tam ekran geçiş reklamı." },
      { front: "Rewarded Ad", back: "Ödüllü reklam türü." },
      { front: "APK", back: "Android uygulama paketi." },
      { front: "Bug", back: "Yazılımsal hata." },
      { front: "Try-Catch", back: "Hata denetim yapısı." },
      { front: "JDK", back: "Android geliştirme kiti." },
      { front: "Photon (PUN)", back: "Multiplayer kütüphanesi." },
      { front: "OnJoinedRoom", back: "Odaya giriş metodu." },
      { front: "Debug.Log", back: "Kontrol mesajı yazdırma." },
      { front: "UI Menu", back: "Başlangıç/Ayarlar menüsü." },
      { front: "Performance Testing", back: "Cihaz çalışma testi." }
    ],
    openEndedQuestions: [
      { q: "\"NavMesh\" (Navigation Mesh) sisteminin yapay zeka (AI) için önemini ve çalışma mantığını açıklayınız.", a: "NavMesh, sahnede yapay zekanın yürümesi için uygun olan ve olmayan alanları hesaplayan bir navigasyon ağıdır. \"Bake\" işlemi ile sahnede yürünebilir alanlar belirlendikten sonra, AI karakterine eklenen NavMesh Agent bileşeni, bu ağı kullanarak engellere takılmadan en kısa yolu bulur ve hedefe ulaşır." },
      { q: "\"Behavior Trees\" (Davranış Ağaçları) yapay zekanın karar verme sürecini nasıl yönetir?", a: "Davranış ağaçları, yapay zekanın belirli şartlara göre (oyuncuyu görüyor mu? canı az mı?) farklı dallara ayrılan bir mantık silsilesi izlemesini sağlar. Bu ağaç yapısı sayesinde düşman AI; devriye atma, kovalama veya kaçma gibi karmaşık davranışları hiyerarşik bir düzende gerçekleştirir." },
      { q: "Unity ses sistemindeki \"Audio Source\" ve \"Audio Listener\" bileşenlerinin rollerini karşılaştırınız.", a: "Audio Source, ses dosyasının oyun dünyasındaki bir nesneden (örn: bir patlama veya radyo) yayılmasını sağlayan hoparlör görevi görür. Audio Listener ise sahnede sesleri duyan kulak görevi görür; genellikle ana kameraya eklenir ve sahnede sadece bir adet bulunması gerekir." },
      { q: "\"Profiler\" penceresi oyun geliştirme sürecinin hangi aşamasında ve neden kullanılır?", a: "Profiler, oyunun geliştirilme sonu ve test aşamasında, bilgisayar kaynaklarının (CPU, Bellek, GPU) nasıl kullanıldığını analiz etmek için kullanılır. Oyunun hangi kısmında FPS düşüşü yaşandığını veya hangi kodun sistemi yorduğunu saptayarak optimizasyon yapmamıza yardımcı olur." },
      { q: "Kod yazarken kullanılan \"Try-Catch\" bloklarının hata yönetimindeki işlevini detaylandırınız.", a: "Try bloğu içine hata oluşma ihtimali olan kodlar (örn: internetten veri indirme) yazılır; eğer bir hata oluşursa program çökmek yerine Catch bloğuna atlar. Bu sayede oyunun aniden kapanması önlenir ve kullanıcıya hatanın ne olduğu hakkında güvenli bir bilgi verilebilir." },
      { q: "\"Build Settings\" menüsü üzerinden bir oyunu paketleme (Build) adımlarını açıklayınız.", a: "Menüden önce hedef platform (Windows, Android, iOS vb.) seçilir, ardından oyuna dahil edilecek sahneler \"Scenes In Build\" listesine eklenir. \"Build\" butonuna basıldığında Unity, tüm kodları ve varlıkları seçilen cihazın çalıştırabileceği tek bir paket dosyası (örn: .exe veya .apk) haline getirir." },
      { q: "Çok oyunculu (Multiplayer) oyunlarda \"Ownership\" (Sahiplik) kavramını photonView.IsMine üzerinden açıklayınız.", a: "Ağ üzerinden oynanan oyunlarda sahnede birden fazla aynı karakter nesnesi bulunur; ancak bir oyuncu sadece kendi karakterini kontrol edebilmelidir. photonView.IsMine kontrolü, o anki kodun sadece nesneye sahip olan oyuncunun bilgisayarında çalışmasını sağlayarak karakterlerin birbirine karışmasını önler." },
      { q: "Mobil oyunlara reklam eklerken kullanılan Interstitial (Geçiş) ve Rewarded (Ödüllü) reklam türlerinin farkı nedir?", a: "Interstitial Ad, bölüm sonlarında veya menü geçişlerinde ekranın tamamını kaplayan reklamlardır. Rewarded Ad ise oyuncunun kendi isteğiyle izlediği ve karşılığında oyun içi ödül (örn: can, altın) kazandığı reklam türüdür; genellikle daha yüksek bir kullanıcı memnuniyeti sağlar." },
      { q: "Oyun optimizasyonu için kullanılan \"LOD\" (Level of Detail) sistemi performansı nasıl artırır?", a: "LOD sistemi, bir nesnenin kameraya olan uzaklığına göre farklı detay seviyelerindeki modellerini kullanır. Nesne çok uzaktayken düşük poligonlu (detaysız) bir model gösterilerek ekran kartının yükü azaltılır, nesneye yaklaşıldıkça yüksek detaylı modele geçiş yapılır." },
      { q: "Yapay zeka kontrolcülerinde \"Raycast\" (Işın Gönderme) yöntemi hangi amaçlarla kullanılır?", a: "Raycast, bir nesneden belirli bir yöne doğru görünmez bir ışın göndererek bu ışının herhangi bir engele çarpıp çarpmadığını tespit eder. AI düşmanların oyuncuyu görüş hattında (Line of Sight) olup olmadığını kontrol etmek veya mermilerin isabet edip etmediğini anlamak için yaygın olarak kullanılır." }
    ]
  }
];

window.EXAM_DATA = EXAM_DATA;
