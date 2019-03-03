class Authenticate {
  private firebase: Firebase;
  constructor(f: Firebase) {
    this.firebase = f;
  }
  public signInWithTwitter = () => {
    return this.firebase.login({
      provider: 'twitter',
      type: 'popup'
    });
  };

  public signInWithGoogle = () => {
    return this.firebase.login({
      provider: 'google',
      type: 'popup'
    });
  };
}

export default Authenticate;
