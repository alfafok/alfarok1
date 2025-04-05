document.addEventListener('DOMContentLoaded', function() {
  // تعيين السنة الحالية في الفوتر
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // قائمة الهاتف المتحركة
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // إغلاق القائمة عند النقر على رابط
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // تأثير العد التصاعدي للإحصائيات
  const stats = document.querySelectorAll('.stat-item .number');
  
  const animateStats = () => {
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(counter);
          stat.textContent = target.toLocaleString();
        } else {
          stat.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    });
  };
  
  // إظهار/إخفاء حقول الباقة المخصصة
  const packageSelect = document.getElementById('package');
  const customFields = document.getElementById('customFields');
  
  packageSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
      customFields.style.display = 'block';
    } else {
      customFields.style.display = 'none';
    }
  });
  
  // إرسال النموذج
  const adForm = document.getElementById('adForm');
  
  adForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع بيانات النموذج
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // إعداد رسالة الواتساب
    let whatsappMessage = `*طلب تسجيل إعلان جديد*%0A%0A`;
    
    // معلومات العميل
    whatsappMessage += `*الاسم:* ${data.name}%0A`;
    whatsappMessage += `*البريد الإلكتروني:* ${data.email}%0A`;
    whatsappMessage += `*رقم الهاتف:* ${data.phone}%0A`;
    whatsappMessage += `*نوع النشاط:* ${data.business}%0A`;
    
    // معلومات الباقة
    if (data.package === 'custom') {
      whatsappMessage += `*الباقة:* مخصصة%0A`;
      whatsappMessage += `*عدد الأيام:* ${data.days}%0A`;
      whatsappMessage += `*الميزانية اليومية:* ${data.budget} جنيه%0A`;
      whatsappMessage += `*الميزانية الإجمالية:* ${data.days * data.budget} جنيه%0A`;
    } else {
      const packageText = packageSelect.options[packageSelect.selectedIndex].text;
      whatsappMessage += `*الباقة:* ${packageText}%0A`;
    }
    
    // معلومات الإعلان
    whatsappMessage += `*نوع الإعلان:* ${data.adType}%0A`;
    
    // ملاحظات إضافية
    if (data.message) {
      whatsappMessage += `*ملاحظات:* ${data.message}%0A`;
    }
    
    // إرسال إلى واتساب
    const whatsappUrl = `https://wa.me/201555573753?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // رسالة تأكيد
    alert(`شكراً ${data.name}!\nتم استلام طلبك بنجاح وسنتواصل معك خلال 24 ساعة.`);
    
    // إعادة تعيين النموذج
    this.reset();
    customFields.style.display = 'none';
  });
  
  // تأثير التمرير السلس
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // إظهار العناصر عند التمرير
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.package-card, .feature, .info-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // تعيين الحالة الأولية للعناصر المتحركة
  const animatedElements = document.querySelectorAll('.package-card, .feature, .info-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
  });
  
  // تشغيل تأثيرات التمرير عند التحميل
  window.addEventListener('load', () => {
    animateStats();
    animateOnScroll();
  });
  
  // تشغيل تأثيرات التمرير عند التمرير
  window.addEventListener('scroll', animateOnScroll);
  
  // تأثير العائمة لزر الواتساب
  const whatsappFloat = document.querySelector('.whatsapp-float');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      whatsappFloat.style.opacity = '1';
      whatsappFloat.style.visibility = 'visible';
    } else {
      whatsappFloat.style.opacity = '0';
      whatsappFloat.style.visibility = 'hidden';
    }
  });
});