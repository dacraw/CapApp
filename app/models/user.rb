class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :session_token, presence: true, uniqueness: true
    validates :fname, presence: true
    validates :lname, presence: true 
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    after_initialize :ensure_session_token
    attr_reader :password

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless (user && user.is_password?(password))
        user
    end

    def is_password?(password)
        pw_dig = BCrypt::Password.new(self.password_digest)
        pw_dig.is_password?(password)
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.update(session_token: User.generate_session_token)
        self.session_token
    end
end
