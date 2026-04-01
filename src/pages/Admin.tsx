import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash, LogOut, Upload, Loader2, Image as ImageIcon, ShoppingCart, LayoutTemplate, Package, CheckCircle, Clock, Video } from "lucide-react";

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'media' | 'videos'>('products');

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  
  const [isUploading, setIsUploading] = useState(false);
  
  // New Product Form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newGallery, setNewGallery] = useState<FileList | null>(null);

  // New Media Form
  const [mediaKey, setMediaKey] = useState("hero_banner");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  // New Video Form
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [vidTitle, setVidTitle] = useState("");
  const [vidCategory, setVidCategory] = useState("sales");
  const [vidViews, setVidViews] = useState("1M");
  const [vidDuration, setVidDuration] = useState("0:15");
  const [vidUrl, setVidUrl] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) {
        fetchProducts();
        fetchOrders();
        fetchMedia();
        fetchVideos();
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && products.length === 0) {
        fetchProducts();
        fetchOrders();
        fetchMedia();
        fetchVideos();
      }
    });
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').neq('icon_name', 'InfluencerVideo').order('created_at', { ascending: false });
    if (!error && data) setProducts(data);
  };

  const fetchOrders = async () => {
    // Fail gracefully if table doesn't exist yet
    try {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) setOrders(data);
    } catch(e) {}
  };

  const fetchMedia = async () => {
    try {
      const { data } = await supabase.from('site_media').select('*').order('updated_at', { ascending: false });
      if (data) setMedia(data);
    } catch(e) {}
  };

  const fetchVideos = async () => {
    try {
      const { data } = await supabase.from('products').select('*').eq('icon_name', 'InfluencerVideo').order('created_at', { ascending: false });
      if (data) {
         const parsed = data.map((v: any) => {
            const [cat, vws, dur] = v.description ? v.description.split('||') : ['sales', '1M', '0:15'];
            return {
               id: v.id,
               title: v.title,
               category: cat || 'sales',
               views: vws || '1M',
               duration: dur || '0:15',
               video_url: v.image_url
            };
         });
         setVideos(parsed);
      }
    } catch(e) {}
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);
    if (uploadError) throw uploadError;
    return supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl;
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let image_url = null;
      let gallery_urls: string[] = [];
      
      if (newImage) image_url = await uploadFile(newImage);
      
      if (newGallery) {
        for (let i = 0; i < newGallery.length; i++) {
          const url = await uploadFile(newGallery[i]);
          gallery_urls.push(url);
        }
      }

      const payload: any = {
        title: newTitle || "Untitled Product",
        description: newDesc,
        price: parseFloat(newPrice) || 0,
        image_url,
        icon_name: 'Layers'
      };
      
      if (gallery_urls.length > 0) {
         payload.image_gallery = gallery_urls;
      }

      if (editingId) {
         const { error } = await supabase.from('products').update(payload).eq('id', editingId);
         if (error) throw error;
      } else {
         const { error } = await supabase.from('products').insert([payload]);
         if (error) throw error;
      }
      
      setEditingId(null);
      setNewTitle(""); setNewDesc(""); setNewPrice(""); setNewImage(null); setNewGallery(null);
      fetchProducts();
      alert(editingId ? "Product updated!" : "Product published!");
    } catch (error: any) {
      alert("Error: " + error.message + " (Did you run the SQL script for E-Commerce tables?)");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBulkImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    alert("Bulk CSV Import has been deprecated in favor of native Supabase syncing. Please configure products manually or via direct SQL.");
    e.target.value = '';
  };

  const handleUploadMedia = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!mediaFile) return;
     setIsUploading(true);
     try {
        const url = await uploadFile(mediaFile);
        const { error } = await supabase.from('site_media').upsert({
           component_key: mediaKey,
           image_url: url,
        });
        if (error) throw error;
        setMediaFile(null);
        fetchMedia();
        alert("Global Site Media Updated!");
     } catch(e:any) { alert("Error: " + e.message + " (SQL Missing?)"); } finally { setIsUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const payload: any = {
        title: vidTitle || "Untitled",
        description: `${vidCategory}||${vidViews}||${vidDuration}`,
        image_url: vidUrl,
        icon_name: 'InfluencerVideo',
        price: 0
      };

      if (editingVideoId) {
         const { error } = await supabase.from('products').update(payload).eq('id', editingVideoId);
         if (error) throw error;
      } else {
         if (!vidUrl) throw new Error("Instagram URL is required.");
         const { error } = await supabase.from('products').insert([payload]);
         if (error) throw error;
      }
      
      setEditingVideoId(null);
      setVidTitle(""); setVidViews("1M"); setVidDuration("0:15"); setVidUrl("");
      fetchVideos();
      alert(editingVideoId ? "Video updated!" : "Video published!");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchVideos();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border p-8 rounded-3xl w-full max-w-md shadow-2xl">
          <h1 className="text-3xl font-black mb-2 text-center tracking-tight text-primary">System Login</h1>
          <p className="text-muted-foreground text-center mb-6 text-sm">Secure CMS Gateway</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-2 uppercase tracking-wide">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl outline-none focus:border-primary transition-colors text-sm font-medium" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-2 uppercase tracking-wide">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl outline-none focus:border-primary transition-colors text-sm font-medium" />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground font-black tracking-widest uppercase text-sm p-4 mt-2 rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95">
              Enter Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 text-foreground pb-24">
      <header className="bg-card border-b border-border h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <h1 className="text-2xl font-black flex items-center gap-3 tracking-tight">
          HastagCreator <span className="bg-foreground text-background px-3 py-1 rounded-full tracking-widest uppercase text-[10px] font-black shadow-md">Admin 2.0</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-muted/50 p-1.5 rounded-xl text-sm font-bold border border-border">
             <button onClick={() => setActiveTab('products')} className={`px-5 py-2 rounded-lg transition-all flex items-center gap-2 ${activeTab === 'products' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
               <Package size={16} /> Content
             </button>
             <button onClick={() => setActiveTab('orders')} className={`px-5 py-2 rounded-lg transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
               <ShoppingCart size={16} /> Ledger
             </button>
             <button onClick={() => setActiveTab('media')} className={`px-5 py-2 rounded-lg transition-all flex items-center gap-2 ${activeTab === 'media' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
               <LayoutTemplate size={16} /> Global Media
             </button>
             <button onClick={() => setActiveTab('videos')} className={`px-5 py-2 rounded-lg transition-all flex items-center gap-2 ${activeTab === 'videos' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
               <Video size={16} /> Videos
             </button>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors ml-4">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MOBILE TABS */}
      <div className="md:hidden flex overflow-x-auto gap-2 p-4 bg-card border-b border-border shadow-sm sticky top-20 z-40">
         <button onClick={() => setActiveTab('products')} className={`shrink-0 px-4 py-2 rounded-lg font-bold text-sm ${activeTab === 'products' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary text-muted-foreground'}`}>Products</button>
         <button onClick={() => setActiveTab('orders')} className={`shrink-0 px-4 py-2 rounded-lg font-bold text-sm ${activeTab === 'orders' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary text-muted-foreground'}`}>Orders</button>
         <button onClick={() => setActiveTab('media')} className={`shrink-0 px-4 py-2 rounded-lg font-bold text-sm ${activeTab === 'media' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary text-muted-foreground'}`}>Global Media</button>
         <button onClick={() => setActiveTab('videos')} className={`shrink-0 px-4 py-2 rounded-lg font-bold text-sm ${activeTab === 'videos' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary text-muted-foreground'}`}>Videos</button>
      </div>

      <div className="container-main mt-8 md:mt-12">
        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 h-fit shadow-xl xl:sticky xl:top-32">
              <h2 className="text-xl font-black mb-1 flex items-center gap-2 text-foreground">
                <Plus className="w-5 h-5 text-primary" /> {editingId ? "Edit Service" : "Create Service"}
              </h2>
              <p className="text-xs text-muted-foreground mb-8 font-semibold">Generates a dynamic `/product/:id` Live Page.</p>
              
              <label className={`w-full bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white font-black tracking-widest uppercase text-[10px] p-3 mb-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                <Upload size={14} /> Upload WooCommerce CSV
                <input type="file" accept=".csv" onChange={handleBulkImport} className="hidden" disabled={isUploading} />
              </label>

              <div className="flex items-center gap-4 mb-6">
                 <div className="flex-1 h-px bg-border/50"></div>
                 <span className="text-xs text-muted-foreground font-black uppercase tracking-widest">OR Add Single</span>
                 <div className="flex-1 h-px bg-border/50"></div>
              </div>
              
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium outline-none focus:border-primary transition-colors" placeholder="Product Title (e.g. Meta Ads Setup)" />
                </div>
                <div>
                  <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium min-h-[120px] outline-none focus:border-primary transition-colors" placeholder="Full un-truncated description supporting multiple paragraphs..." />
                </div>
                <div>
                  <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium outline-none focus:border-primary transition-colors" placeholder="Price (₹0 for Custom CTA)" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col">
                     <label className="text-[10px] font-black text-muted-foreground mb-1 uppercase tracking-widest break-words">Main Display</label>
                     <label className="flex-1 flex flex-col items-center justify-center bg-background border-2 border-border border-dashed p-4 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                        <ImageIcon className="w-5 h-5 text-primary mb-2" />
                        <span className="text-[11px] font-bold text-center w-full truncate px-1">{newImage ? newImage.name : "Cover Image"}</span>
                        <input type="file" accept="image/*" onChange={e => setNewImage(e.target.files?.[0] || null)} className="hidden" />
                     </label>
                  </div>
                  <div className="flex flex-col">
                     <label className="text-[10px] font-black text-muted-foreground mb-1 uppercase tracking-widest break-words">Gallery Carousel</label>
                     <label className="flex-1 flex flex-col items-center justify-center bg-background border-2 border-border border-dashed p-4 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                        <Upload className="w-5 h-5 text-primary mb-2" />
                        <span className="text-[11px] font-bold text-center w-full truncate px-1">{newGallery ? `${newGallery.length} added` : "Multiple Allowed"}</span>
                        <input type="file" accept="image/*" multiple onChange={e => setNewGallery(e.target.files)} className="hidden" />
                     </label>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setNewTitle(""); setNewDesc(""); setNewPrice(""); }} className="w-1/3 bg-muted text-foreground font-black tracking-widest uppercase text-xs p-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2">
                      Cancel
                    </button>
                  )}
                  <button disabled={isUploading} type="submit" className="flex-1 bg-foreground text-background font-black tracking-widest uppercase text-xs p-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0">
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingId ? "Save Changes" : "Publish"}
                  </button>
                </div>
              </form>
            </div>

            <div className="xl:col-span-2 space-y-4 transition-all">
              {products.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-card border border-border border-dashed rounded-3xl">
                   <Package className="w-12 h-12 text-muted-foreground/30 mb-4" />
                   <h3 className="text-xl font-bold mb-1">No Active Products</h3>
                   <p className="text-sm text-muted-foreground font-medium text-center">Your CMS is currently empty.</p>
                </div>
              ) : (
                products.map((p: any) => (
                  <div key={p.id} className="group flex flex-col sm:flex-row gap-5 bg-card border border-border p-4 rounded-3xl shadow-sm hover:shadow-card-hover transition-all items-center">
                    <img src={p.image_url || "/placeholder.svg"} className="w-full sm:w-32 h-24 object-cover rounded-2xl bg-muted border border-border/50 shrink-0" alt="" />
                    <div className="flex-1 w-full text-center sm:text-left overflow-hidden">
                      <h3 className="font-bold text-lg truncate">{p.title}</h3>
                      <p className="text-muted-foreground text-xs line-clamp-1 mt-1 mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                         <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {p.price > 0 ? `₹${p.price.toLocaleString("en-IN")}` : "Custom"}
                         </span>
                         {p.image_gallery && p.image_gallery.length > 0 && (
                            <span className="bg-secondary text-muted-foreground border border-border px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                               {p.image_gallery.length} Extras
                            </span>
                         )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 h-full justify-center mt-4 sm:mt-0">
                       <button onClick={() => { setEditingId(p.id); setNewTitle(p.title); setNewDesc(p.description); setNewPrice(p.price); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-full sm:w-16 h-10 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all flex justify-center items-center font-bold text-xs uppercase tracking-wider">
                         Edit
                       </button>
                       <button onClick={() => handleDelete(p.id)} className="w-full sm:w-16 h-10 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive hover:text-white transition-all flex justify-center items-center">
                         <Trash className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden p-6 lg:p-10">
            <div className="mb-8">
               <h2 className="text-2xl font-black flex items-center gap-3"><ShoppingCart className="text-primary"/> Store Ledger</h2>
               <p className="text-sm text-muted-foreground font-medium mt-1">Real-time mapping of successful Razorpay checkout payloads.</p>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                     <tr className="border-b border-border/50 text-muted-foreground font-bold text-xs uppercase tracking-wider">
                        <th className="px-4 py-4">Transaction Date</th>
                        <th className="px-4 py-4">Product</th>
                        <th className="px-4 py-4">Revenue</th>
                        <th className="px-4 py-4">Razorpay Ref</th>
                        <th className="px-4 py-4 text-center">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                     {orders.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="py-20 text-center font-medium text-muted-foreground">No orders captured yet. Ensure your Database is upgraded.</td>
                        </tr>
                     ) : (
                        orders.map((o:any) => (
                           <tr key={o.id} className="hover:bg-muted/20 transition-colors">
                              <td className="px-4 py-5 font-medium flex items-center gap-2"><Clock size={14} className="text-muted-foreground"/> {new Date(o.created_at).toLocaleString()}</td>
                              <td className="px-4 py-5 font-bold">{o.product_name}</td>
                              <td className="px-4 py-5 font-black text-primary">₹{o.amount.toLocaleString()}</td>
                              <td className="px-4 py-5 font-mono text-xs text-muted-foreground">{o.payment_id}</td>
                              <td className="px-4 py-5 text-center">
                                 <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    <CheckCircle size={12}/> {o.status}
                                 </span>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-card border border-border rounded-3xl p-6 lg:p-10 shadow-xl h-fit">
               <h2 className="text-2xl font-black mb-1 flex items-center gap-3"><LayoutTemplate className="text-primary"/> Global Site Media</h2>
               <p className="text-sm text-muted-foreground mb-8">Force-upgrade static website assets dynamically across all clients.</p>
               
               <form onSubmit={handleUploadMedia} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2 uppercase tracking-wide">Target Component</label>
                    <div className="relative">
                       <select value={mediaKey} onChange={e=>setMediaKey(e.target.value)} className="w-full bg-background border border-border p-4 rounded-xl text-sm font-bold shadow-sm appearance-none outline-none focus:border-primary cursor-pointer">
                          <option value="hero_banner">Homepage Hero Banner</option>
                          <option value="footer_logo">Footer Agency Logo</option>
                       </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2 uppercase tracking-wide">New Image File</label>
                    <label className="w-full flex flex-col items-center justify-center bg-background border-2 border-border border-dashed p-8 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors group">
                       <Upload className="w-8 h-8 text-primary mb-3 group-hover:-translate-y-1 transition-transform" />
                       <span className="text-sm font-bold text-center w-full truncate px-4">{mediaFile ? mediaFile.name : "Click to select overriding asset"}</span>
                       <input type="file" accept="image/*" onChange={e => setMediaFile(e.target.files?.[0] || null)} className="hidden" />
                    </label>
                  </div>
                  
                  <button disabled={isUploading || !mediaFile} type="submit" className="w-full bg-foreground text-background font-black tracking-widest uppercase text-xs p-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0">
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy to Edge Cache"}
                  </button>
               </form>
             </div>
             
             <div className="bg-muted/30 border border-border rounded-3xl p-6 lg:p-10">
               <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Live Map</h3>
               <div className="space-y-4">
                  {media.length === 0 && <p className="text-sm font-medium text-muted-foreground text-center py-10">No dynamic media deployed yet. Defaults are active.</p>}
                  {media.map((m:any) => (
                     <div key={m.component_key} className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                        <img src={m.image_url} alt={m.component_key} className="w-16 h-16 object-cover rounded-xl bg-muted border border-border border-dashed" />
                        <div className="flex-1 overflow-hidden">
                           <h4 className="font-bold text-sm tracking-wide">{m.component_key}</h4>
                           <a href={m.image_url} target="_blank" rel="noreferrer" className="text-xs text-primary font-medium truncate w-full hover:underline mt-1 block">Inspect File</a>
                        </div>
                     </div>
                  ))}
               </div>
             </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 h-fit shadow-xl xl:sticky xl:top-32">
              <h2 className="text-xl font-black mb-1 flex items-center gap-2 text-foreground">
                <Plus className="w-5 h-5 text-primary" /> {editingVideoId ? "Edit Video" : "Upload Video"}
              </h2>
              <p className="text-xs text-muted-foreground mb-8 font-semibold">Will show in Influencer UGC Page.</p>
              
              <form onSubmit={handleCreateVideo} className="space-y-4">
                <div>
                  <input type="text" value={vidTitle} onChange={e => setVidTitle(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium outline-none focus:border-primary transition-colors" placeholder="Video Title (e.g. Hooks Demo)" />
                </div>
                <div>
                  <select value={vidCategory} onChange={e => setVidCategory(e.target.value)} className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium outline-none focus:border-primary cursor-pointer transition-colors">
                    <option value="sales">Sales Focused</option>
                    <option value="brand">Brand Awareness</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={vidViews} onChange={e => setVidViews(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium outline-none focus:border-primary transition-colors" placeholder="Views (e.g. 1.2M)" />
                  <input type="text" value={vidDuration} onChange={e => setVidDuration(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium outline-none focus:border-primary transition-colors" placeholder="Duration (e.g. 0:15)" />
                </div>
                <div className="flex flex-col pt-2">
                   <label className="text-[10px] font-black text-muted-foreground mb-1 uppercase tracking-widest break-words">Instagram Link</label>
                   <input type="text" value={vidUrl} onChange={e => setVidUrl(e.target.value)} required className="w-full bg-background border border-border p-3.5 rounded-xl text-sm font-medium outline-none focus:border-primary transition-colors" placeholder="https://www.instagram.com/reel/..." />
                </div>
                <div className="flex gap-2 mt-6">
                  {editingVideoId && (
                    <button type="button" onClick={() => { setEditingVideoId(null); setVidTitle(""); setVidViews("1M"); setVidDuration("0:15"); setVidUrl(""); }} className="w-1/3 bg-muted text-foreground font-black tracking-widest uppercase text-xs p-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2">
                      Cancel
                    </button>
                  )}
                  <button disabled={isUploading} type="submit" className="flex-1 bg-foreground text-background font-black tracking-widest uppercase text-xs p-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0">
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingVideoId ? "Save Changes" : "Save Video"}
                  </button>
                </div>
              </form>
            </div>

            <div className="xl:col-span-2 space-y-4 transition-all">
              {videos.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-card border border-border border-dashed rounded-3xl">
                   <Video className="w-12 h-12 text-muted-foreground/30 mb-4" />
                   <h3 className="text-xl font-bold mb-1">No Videos Added</h3>
                   <p className="text-sm text-muted-foreground font-medium text-center">Add Instagram links to display on the Influencer page.</p>
                </div>
              ) : (
                videos.map((v: any) => (
                  <div key={v.id} className="group flex flex-col sm:flex-row gap-5 bg-card border border-border p-4 rounded-3xl shadow-sm hover:shadow-card-hover transition-all items-center">
                    <div className="w-full sm:w-32 h-24 bg-muted border border-border/50 shrink-0 flex items-center justify-center rounded-2xl overflow-hidden relative">
                       {v.video_url?.includes('instagram.com') ? (
                          <iframe src={`${v.video_url.split('?')[0].replace(/\/$/, '')}/embed`} className="w-full h-full pointer-events-none scale-150" frameBorder="0" scrolling="no" />
                       ) : (
                          <Video className="w-8 h-8 text-muted-foreground/50" />
                       )}
                    </div>
                    <div className="flex-1 w-full text-center sm:text-left overflow-hidden">
                      <h3 className="font-bold text-lg truncate">{v.title}</h3>
                      <p className="text-muted-foreground text-xs line-clamp-1 mt-1 mb-3">Category: <span className="uppercase font-bold">{v.category}</span></p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                         <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {v.views} Views
                         </span>
                         <span className="bg-secondary text-muted-foreground border border-border px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {v.duration}
                         </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 h-full justify-center mt-4 sm:mt-0">
                       <button onClick={() => { setEditingVideoId(v.id); setVidTitle(v.title); setVidCategory(v.category || 'sales'); setVidViews(v.views); setVidDuration(v.duration); setVidUrl(v.video_url || ""); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-full sm:w-16 h-10 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all flex justify-center items-center font-bold text-xs uppercase tracking-wider">
                         Edit
                       </button>
                       <button onClick={() => handleDeleteVideo(v.id)} className="w-full sm:w-16 h-10 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive hover:text-white transition-all flex justify-center items-center">
                         <Trash className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
