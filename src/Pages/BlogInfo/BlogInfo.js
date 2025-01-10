import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { Link } from 'react-router-dom'
import './BlogInfo.css'
export default function BlogInfo() {
    return (
        <>

            <Header />
            <div className="main">
                <div className="blog-infos">

                    <div className="blog-infos-right">
                        <figure className='pic'>
                            <img src="/images/blogs/1.webp" alt="" srcset="" />
                        </figure>
                        <div class="blog-infos-postsList">
                            <div class="titleList">
                                مطالب مرتبط
                            </div>
                            <ul>
                            </ul>
                        </div>

                    </div>
                    <div className="blog-infos-left">
                        <div className="blog-infos-top">
                            <h1>طرح ویژه مایکروسافت برای شکست‌دادن مک‌بوک ایر M3 لو رفت</h1>
                        </div>
                        <div className="blog-infos-left-item">
                            <div className="option-item">
                                <h3>دسته بندی ها</h3>
                                <Link>خبر</Link>
                            </div>
                            <div className="option-item">
                                <h3>نویسنده</h3>
                                <Link>trob</Link>
                            </div>
                            <div className="option-item">
                                <h3>تاریخ انتشار</h3>
                                <Link>
                                    24/فروردین/1403
                                </Link>
                            </div>
                            <div className="option-item">
                                <h3>
                                    بازدید
                                </h3>
                                <Link>90</Link>
                            </div>
                            <div className="option-item">
                                <h3>
                                    زمان مورد نیاز برای مطالعه
                                </h3>
                                <Link>2 دقیقه</Link>
                            </div>

                        </div>
                    <div class="blog-infos-left-bot"><p>مایکروسافت قصد دارد اواخر اردیبهشت در مراسمی ویژه اولین کامپیوترهای هوش مصنوعی خود برای مصرف‌کنندگان عادی را رونمایی کند. در فاصله‌ی باقی‌مانده به مراسم، ورج در گزارشی اختصاصی از برنامه‌های مایکروسافت پرده برداشته و گفته است که این شرکت برای شکست‌دادن پردازنده‌ی M3 اپل آماده می‌شود.</p>

                        <p>ظاهراً مایکروسافت معتقد است که مجموعه‌ی جدیدی از لپ‌تاپ‌های ویندوزی مبتنی‌بر آرم توانایی شکست‌دادن مک بوک ایر M3 را نه‌تنها در بخش هوش مصنوعی، بلکه در بخش عملکرد CPU دارند.</p>

                        <p>مایکروسافت حساب ویژه‌ای روی پردازنده‌ی اسنپدراگون ایکس الیت باز کرده است. این شرکت سال‌ها به وعده‌های کوالکام امیدوار بود؛ اما در‌نهایت اپل بهترین عملکرد ممکن را در حوزه‌ی آرم به‌نمایش گذاشت. حالا مایکروسافت با اتکا بر ایکس الیت می‌خواهد برای اپل خط‌و‌نشان بکشد.</p>

                        <p>به‌گفته‌ی ورج، مایکروسافت به‌حدی به ایکس الیت اعتقاد دارد که می‌خواهد چندین دمو برای اثبات قوی‌تربودن ایکس الیت از M3 به‌نمایش بگذارد. این دموها روی پردازش‌های CPU‌محور و شتاب‌ده هوش مصنوعی و حتی شبیه‌سازی اپلیکیشن متمرکز خواهند بود.</p>

                        <p>غول ردموندی قرار است ادعا کند که کامپیوترهای ویندوزی نسل جدید عملکرد سریع‌تر از سیستم شبیه‌ساز Rosetta 2 اپل دارند. Rosetta 2 لایه‌ای نرم‌افزاری است که اپل در مک‌های نسل جدید از آن استفاده می‌کند تا کامپیوترهایش توانایی اجرای اپلیکیشن‌های x64 نوشته‌شده برای پردازنده‌‌ اینتل را داشته باشند.</p>

                        <p>شبیه‌سازی اپلیکیشن یکی از ضعف‌های بزرگ‌ نسخه‌ی آرم ویندوز (Windows on Arm) بوده است. مایکروسافت دو سال پیش نرم‌افزار شبیه‌سازی اپلیکیشن‌های x64 را برای ویندوز ۱۱ معرفی کرد؛ اما درنهایت مشخص شد به‌دلیل ضعف پردازنده، این نرم‌افزار عملکرد چشمگیری ندارد.</p></div>
                </div>
                    </div>
            </div>
            <Footer />
        </>
    )
}
