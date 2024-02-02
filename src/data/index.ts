import { ImageProps } from "react-native";

export interface IData {
  id: number;
  image: ImageProps;
  text: string;
}

const data: IData[] = Array.from({ length: 50 }, (_, index) => ({
  id: index,
  image: require("../assets/Star.png"),
  text: "Bookmark",
}));

export const lorem: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta faucibus turpis, a auctor justo tempus vitae. Morbi pellentesque massa felis, vitae ultrices turpis condimentum eu. Aliquam nunc velit, volutpat sit amet lobortis at, cursus ac mauris. Donec ut augue tempor, facilisis erat sed, tempor tortor. Ut eget nibh ac felis vestibulum convallis. Donec iaculis efficitur orci, id ultricies dolor lacinia in. Duis quis lectus a purus ultricies tincidunt. Quisque condimentum turpis sed massa elementum, lacinia egestas nisi ultrices. Duis faucibus porta porta. Sed quam neque, sodales nec urna sit amet, scelerisque malesuada urna. Suspendisse commodo ex sed diam egestas tristique. Sed id odio massa. Donec non orci vel metus consectetur vehicula id ac metus. Nullam lorem ex, ullamcorper in efficitur et, varius vitae risus. Nullam imperdiet sapien sed ligula imperdiet, non rhoncus lectus vehicula. Suspendisse ultrices faucibus orci non feugiat.

Fusce feugiat, dui a consectetur tincidunt, enim eros rhoncus quam, eu consectetur massa diam id ligula. Cras rutrum urna vitae orci viverra, at pharetra mi eleifend. Praesent iaculis nunc eget lacinia rhoncus. Nunc in ultrices eros, ut rutrum ex. Nunc sollicitudin condimentum faucibus. Ut hendrerit neque sed libero suscipit condimentum laoreet vitae dui. Pellentesque nec laoreet velit. Duis sollicitudin finibus odio. Vestibulum ut tellus sem. Suspendisse potenti. Nam ultricies in ipsum quis mollis. Morbi eleifend turpis sed magna feugiat feugiat. Integer cursus purus scelerisque, varius urna vel, pulvinar augue. Etiam ac mauris eu ante scelerisque tincidunt vel ut arcu. Nullam lacinia urna sit amet elementum vulputate. Fusce viverra lacus id elit laoreet, sit amet convallis dolor accumsan.

Morbi laoreet volutpat mauris quis gravida. Nullam eget sapien eu dui mollis pharetra ac ut nunc. Integer vitae gravida lectus. Etiam sed eleifend diam, at egestas nisl. Morbi dictum quam quis velit placerat venenatis. Aliquam ut nibh non arcu cursus volutpat. Maecenas ultricies risus quis nunc facilisis, et sagittis ante maximus. Quisque at viverra diam.

Nunc a convallis ligula. Nunc quis accumsan augue, lobortis ornare diam. Aenean euismod nunc sed luctus sollicitudin. Donec ultricies est ante. In gravida sed lectus eu hendrerit. Nam ut massa ullamcorper, gravida libero quis, varius augue. Sed faucibus, nibh non iaculis congue, eros lorem faucibus elit, id consequat justo felis ut nisi.

Vivamus aliquet finibus elementum. In efficitur tellus nec sem malesuada, tristique malesuada felis rutrum. Nullam vel purus dolor. Quisque convallis porta velit, nec pulvinar eros mattis in. Etiam sit amet ultricies tortor. Duis sit amet ex sed ligula consectetur aliquet. Proin tincidunt viverra lobortis. Aenean ac commodo ante. Ut tincidunt ac ex a consectetur. Ut placerat, sem id suscipit finibus, mi libero malesuada lorem, tempus rutrum augue ex quis turpis. Morbi vel feugiat nulla, et pharetra tortor. Aenean sit amet sollicitudin tellus, sed commodo nisi. Curabitur fermentum, ligula sed vestibulum aliquet, elit metus lobortis est, in ullamcorper dui massa eget elit. Pellentesque in diam vulputate, tristique massa ac, aliquet ante. Fusce feugiat finibus pulvinar.

Phasellus a velit justo. Cras nec nisl blandit, faucibus mauris consectetur, rhoncus metus. Suspendisse volutpat sapien sit amet auctor gravida. Proin sit amet risus rhoncus, pretium nibh et, consectetur eros. Praesent condimentum quis metus quis auctor. Duis venenatis, mi ut porttitor tempor, justo leo laoreet arcu, sit amet ullamcorper tortor velit vitae lacus. Aliquam non bibendum dui, vitae aliquet libero. Sed vel arcu nec sapien efficitur malesuada consectetur vitae lectus. Mauris euismod sed enim et elementum. Nulla ullamcorper aliquam mi eu lobortis. Etiam at auctor justo. In libero magna, commodo nec nunc ac, vestibulum pellentesque eros.`;

export default data;
