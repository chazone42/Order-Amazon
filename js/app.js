new Vue({
	el:'#app',
	data: {
		isShowingCart: false,
		tableNo:'00',
		numberOfPeople : '00',
		products: [
			{
				id:1,
				name:'ชาเขียวนม',
				description:'ชาเขียวนมสดปั่นสูตรพิเศษ รสนุ่มนวลอย่างลงตัว',
				price: 60,
				img:'./images/greentea.png'
			},
			{
				id:2,
				name:'คาราเมลมัคคิอาโต้',
				description:'กาแฟเย็นผสมนมสด หวานละมุน หอมกลิ่นคาราเมล',
				price: 70,
				img:'./images/caramel.png'
			},
			{
				id:3,
				name:'Amazon Fortune Cookies',
				description:'กาแฟปั่นผสมไซรัปกลิ่นคุกกี้ราดซอสคาราเมล',
				price: 110,
				img:'./images/cookie.png'
			},
			{
				id:4,
				name:'สตรอเบอร์รี่ชีสเค้ก',
				description:'เครื่องดื่มปั่นรสสตรอเบอร์รี่ หอมกลิ่นชีสเค้ก เคี้ยวเพลิดเพลินไปกับบัตเตอร์คุกกี้แสนอร่อย',
				price: 120,
				img:'./images/strawberry.png'
			},
			{
				id:5,
				name:'ชาเขียวน้ำผึ้งมะนาวเจลลี่',
				description:'ชาเขียวเย็น ผสมน้ำผึ้งธรรมชาติและน้ำมะนาวสด ตกแต่งด้านบนเครื่องดื่มด้วยเจลลี่น้ำผึ้ง',
				price: 80,
				img:'./images/greenteahoney.png'
			},
			{
				id:6,
				name:'น้ำกีวี่ปั่น',
				description:'น้ำกีวี่เข้มข้น หอม หวาน อมเปรี้ยว อร่อยสดชื่นโดนใจ',
				price: 50,
				img:'./images/kiwi.png'
			}

		],
		cart:{
			items:[]
		}

	},
	methods:{
		addProductToCart: function(product) {

			var cartItem = this.getCartItem(product)
			if (cartItem != null){
				cartItem.quantity++
			}else{
				this.cart.items.push({
					product:product,
					quantity:1
				})
			}

			product.inStock--;

		},
		getCartItem:function(product){
			for (var i = 0;i< this.cart.items.length; i++){
				if(this.cart.items[i].product.id===product.id){
					return this.cart.items[i];
				}
			}
			return null;

		},
		increaseQty:function(item){
			item.product.inStock--
			item.quantity++
		},
		decreaseQty:function(item){
			item.product.inStock++
			item.quantity--

			if (item.quantity == 0){
				this.removeItemFormCart(item)
			}
		},
		removeItemFormCart:function(item){
			var index = this.cart.items.indexOf(item)
			if (index !== -1){
				this.cart.items.splice(index,1)
			}
		},
		dateOfslip:function () {
      var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();

      if(month.toString().length == 1) {
           month = '0'+month;
      }
      if(day.toString().length == 1) {
           day = '0'+day;
      }   
      
      var dateTime = day+'/'+month+'/'+year;   
       return dateTime;
  },

  timeOfslip:function () {
      var now     = new Date(); 
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      
      if(hour.toString().length == 1) {
           hour = '0'+hour;
      }
      if(minute.toString().length == 1) {
           minute = '0'+minute;
      }
      if(second.toString().length == 1) {
           second = '0'+second;
      }   
      var dateTime = hour+':'+minute+':'+second;   
       return dateTime;
  }
	},
	computed:{
		cartTotal:function(){
			var total = 0
			this.cart.items.forEach(function(item){
				total += item.quantity * item.product.price
			})

			return total;
		},
		taxAmount:function(){
			return (this.cartTotal*7)/100
		},
		grandTotal:function(){
			return this.cartTotal + this.taxAmount
		}
	},
	filters:{
		currency:function(value){
			var formatter = new Intl.NumberFormat('th-TH',{
				style:'currency',
				currency:'THB',
				minimumFractionDigits:0
			});

			return formatter.format(value)
		}
	}

});





