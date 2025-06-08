
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AgroFresh GH</span>
            </div>
            <p className="text-secondary-foreground/80 mb-6 max-w-md">
              Connecting Ghana's farmers with vendors to reduce waste, increase profits, 
              and ensure fresh produce reaches every table across the country.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">How it Works</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Support</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-secondary-foreground/80">+233 20 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-secondary-foreground/80">hello@agrofresh.gh</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-secondary-foreground/80">Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-secondary-foreground/60 text-sm mb-4 md:mb-0">
            © 2024 AgroFresh GH. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
