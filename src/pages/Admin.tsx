import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash, LogOut, Upload, Loader2, Image as ImageIcon } from "lucide-react";

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // New Product Form
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchProducts();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) setProducts(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let image_url = null;
      
      // Upload Image if selected
      if (newImage) {
        const fileExt = newImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, newImage);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
          
        image_url = publicUrl;
      }

      // Insert Product
      const { error } = await supabase.from('products').insert([
        {
          title: newTitle || "Untitled Product",
          description: newDesc,
          price: parseFloat(newPrice) || 0,
          image_url,
          icon_name: 'Layers'
        }
      ]);

      if (error) throw error;
      
      // Reset form
      setNewTitle("");
      setNewDesc("");
      setNewPrice("");
      setNewImage(null);
      fetchProducts();
      alert("Product successfully pushed to Website Arsenal!");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, image_url: string) => {
    if (!confirm("Are you sure you want to permanently delete this product from the website?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <h1 className="text-3xl font-black mb-6 text-center tracking-tight">System Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-muted-foreground block mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-background border border-border p-3 rounded-xl outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-sm font-bold text-muted-foreground block mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-background border border-border p-3 rounded-xl outline-none focus:border-primary transition-colors" />
            </div>
            <button type="submit" className="w-full bg-foreground text-background font-bold p-3.5 mt-2 rounded-xl hover:bg-foreground/90 transition-all shadow-lg active:scale-95">
              Enter Admin Portal
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold block mb-1">First Time Setting Up?</span>
             You must create a user in your Supabase Account first. <br/> Go to <span className="text-foreground font-semibold">Supabase &gt; Authentication &gt; Add User</span> to create your login credentials.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <header className="bg-card border-b border-border py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <h1 className="text-2xl font-black flex items-center gap-2">HastagCreator <span className="bg-primary/10 text-primary px-3 py-1 rounded-full tracking-widest uppercase text-xs">CMS</span></h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors bg-secondary px-4 py-2 rounded-lg">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="container-main mt-12 grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* CREATE PRODUCT FORM */}
        <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 h-fit sticky top-28 shadow-xl">
          <h2 className="text-2xl font-black mb-1 flex items-center gap-2">
            <Plus className="w-6 h-6 text-primary" /> Create Product
          </h2>
          <p className="text-sm text-muted-foreground mb-8">This will instantly sync to the website's Arsenal grid.</p>
          
          <form onSubmit={handleCreateProduct} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1 uppercase tracking-wider">Product Title</label>
              <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} required className="w-full bg-background border border-border p-3 rounded-xl text-sm outline-none focus:border-primary transition-colors" placeholder="e.g. Meta Ads Setup" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1 uppercase tracking-wider">Description</label>
              <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} required className="w-full bg-background border border-border p-3 rounded-xl text-sm min-h-[100px] outline-none focus:border-primary transition-colors" placeholder="High-converting ad setup..." />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1 uppercase tracking-wider">Price (₹)</label>
              <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} required className="w-full bg-background border border-border p-3 rounded-xl text-sm outline-none focus:border-primary transition-colors" placeholder="Enter 0 for 'Custom' CTA" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1 uppercase tracking-wider">Product Thumbnail</label>
              <label className="w-full flex flex-col items-center justify-center gap-3 bg-background border-2 border-border border-dashed p-6 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors group">
                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ImageIcon className="w-6 h-6 text-primary" />
                 </div>
                 <span className="text-sm font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap w-full text-center px-4">
                    {newImage ? newImage.name : "Click to select a 4:3 image"}
                 </span>
                 <input type="file" accept="image/*" onChange={e => setNewImage(e.target.files?.[0] || null)} className="hidden" />
              </label>
            </div>
            <button disabled={isUploading} type="submit" className="w-full bg-foreground text-background font-bold p-4 mt-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0">
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish to Website Arsenal"}
            </button>
          </form>
        </div>

        {/* PRODUCT LIST */}
        <div className="xl:col-span-2 space-y-5">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h2 className="text-3xl font-black">Live Inventory</h2>
                <p className="text-muted-foreground font-medium mt-1">Manage everything active on the website.</p>
             </div>
             <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                {products.length} Products Live
             </div>
          </div>
          
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-card border border-border border-dashed rounded-3xl">
               <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                 <Upload className="w-10 h-10 text-muted-foreground" />
               </div>
               <h3 className="text-xl font-bold mb-2">No Arsenal Data</h3>
               <p className="text-muted-foreground font-medium max-w-sm text-center">Add your very first product via the form on the left, and it will instantly go live on your homepage.</p>
            </div>
          ) : (
            products.map((p: any) => (
              <div key={p.id} className="group flex flex-col sm:flex-row gap-6 bg-card border border-border p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow items-center">
                {p.image_url ? (
                   <img src={p.image_url} alt={p.title} className="w-full sm:w-40 h-32 object-cover rounded-2xl bg-muted border border-border/50" />
                ) : (
                   <div className="w-full sm:w-40 h-32 bg-muted/30 rounded-2xl flex items-center justify-center border border-border/50">
                      <ImageIcon className="w-8 h-8 text-muted-foreground/50 block mx-auto" />
                   </div>
                )}
                
                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="font-bold text-xl tracking-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-2 mb-4 leading-relaxed max-w-lg">{p.description}</p>
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                     {p.price > 0 ? `₹${p.price.toLocaleString("en-IN")}` : "Custom Price Linked to Calendly"}
                  </span>
                </div>
                
                <button onClick={() => handleDelete(p.id, p.image_url)} className="w-full sm:w-auto mt-4 sm:mt-0 p-4 bg-destructive/5 text-destructive rounded-2xl hover:bg-destructive hover:text-white transition-all">
                  <Trash className="w-5 h-5 mx-auto" />
                </button>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
}
