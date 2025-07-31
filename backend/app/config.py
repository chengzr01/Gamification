import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-insecure-key')  # used for sessions, CSRF
    DEBUG = False
    TESTING = False

    # Example: OpenAI API key
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

    # Database (if using SQLAlchemy)
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
    DEBUG = True

class ProductionConfig(Config):
    pass

# Optional mapping
config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}
