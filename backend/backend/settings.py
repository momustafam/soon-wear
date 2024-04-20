from pathlib import Path
from configurations import Configuration, values

class Dev(Configuration):
    # The directory of uploaded media files of the project
    MEDIA_ROOT = r'D:\Work\Soon Wear\soon-wear\frontend\src\images'
    # MEDIA_ROOT = r'C:\soonwear\soon-wear\frontend\src\images'

    # The URL prefix for media files
    MEIDA_URL = '/media/'

    # Build paths inside the project like this: BASE_DIR / 'subdir'.
    BASE_DIR = Path(__file__).resolve().parent.parent


    # Quick-start development settings - unsuitable for production
    # See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

    # SECURITY WARNING: keep the secret key used in production secret!
    SECRET_KEY = 'django-insecure-h!sc43$uz(_1+om_-$ge@5q&+y4m76de5bt#(_+ou$0v$--xmd'

    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = values.BooleanValue(True)
    ALLOWED_HOSTS = ["*", "127.0.0.1", "localhost", "192.168.1.9"]


    # Application definition

    INSTALLED_APPS = [
        # 'admin_interface',
        # 'colorfield',
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'corsheaders',
        'inventory',
        'rest_framework',
        'debug_toolbar',
    ]

    MIDDLEWARE = [
        "corsheaders.middleware.CorsMiddleware",
        "django.middleware.common.CommonMiddleware",
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    ]

    ROOT_URLCONF = 'backend.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'backend.wsgi.application'


    # Database
    # https://docs.djangoproject.com/en/5.0/ref/settings/#databases

    # A full list of schematat for other DBMS here
    # https://github.com/kennethreitz/dj-database-url#url-schema
    DATABASES = values.DatabaseURLValue(f"sqlite:///{BASE_DIR}/db.sqlite3")


    # Password validation
    # https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]


    # Internationalization
    # https://docs.djangoproject.com/en/5.0/topics/i18n/

    LANGUAGE_CODE = 'ar'

    TIME_ZONE = values.Value("UTC")

    USE_I18N = True

    USE_TZ = True


    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/5.0/howto/static-files/

    STATIC_URL = 'static/'

    # Default primary key field type
    # https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

    DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

    REST_FRAMEWORK = {
        'DEFAULT_RENDERER_CLASSES': [
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.BrowsableAPIRenderer',
        ],
        'DEFAULT_FILTER_BACKENDS': [
            'django_filters.rest_framework.DjangoFilterBackend',
            'rest_framework.filters.OrderingFilter',
            'rest_framework.filters.SearchFilter',
        ],
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 12,
    }


    CORS_ALLOW_ALL_ORIGINS = True

    INTERNAL_IPS = [
        '127.0.0.1'
    ]
    
class Prod(Dev):
    DEBUG = False
    SECRET_KEY = values.SecretValue()